import logger from '../services/log/console-logger.ts';
import { WsDisconnectedError } from './errors.ts';

type WsTransportOptions = {
  getUrl: () => Promise<string>;
  onMessage: (data: unknown) => void;
  onDisconnect: (error: WsDisconnectedError) => void;
  pingMessage: unknown;
  pingIntervalMs: number;
};

export class WsTransport {
  private _options: WsTransportOptions;
  private _socket: WebSocket | null = null;
  private isConnected = false;
  private isClosedByUs = false;
  private timerCancellation: number | undefined;
  public constructor(options: WsTransportOptions) {
    this._options = options;
  }

  public async connect(): Promise<void> {
    const url = await this._options.getUrl();
    this.isClosedByUs = false;

    return new Promise<void>((resolve, reject) => {
      const socket = new WebSocket(url);
      this._socket = socket;

      socket.addEventListener('open', () => {
        this.isConnected = true;
        this.startPing();
        resolve();
      });

      socket.addEventListener('message', (event) => {
        try {
          this._options.onMessage(JSON.parse(event.data));
        } catch (e) {
          logger.error(e);
        }
      });

      // Слушателя error нет намеренно: событие приходит без кода и причины,
      // а за ним всегда следует close — там и код и причина
      socket.addEventListener('close', (event) => {
        window.clearInterval(this.timerCancellation);

        const wasConnected = this.isConnected;
        this.isConnected = false;

        // Закрыли мы сами (смена чата, выход) — штатный сценарий
        if (this.isClosedByUs) {
          return;
        }

        const cause = event.wasClean
          ? 'Сервер закрыл соединение'
          : 'Обрыв соединения';
        const error = new WsDisconnectedError(
          `${cause}. Код: ${event.code} | Причина: ${event.reason}`,
        );

        // Транспорт выбирает только канал, а не судьбу ошибки: до open промис
        // ещё висит и годится reject, после open он уже разрешён и reject —
        // no-op, поэтому нужен onDisconnect. Что показать пользователю,
        // решает вызывающий слой.
        if (wasConnected) {
          this._options.onDisconnect(error);
        } else {
          reject(error);
        }
      });
    });
  }

  public send(data: unknown) {
    const socket = this._socket;

    if (socket === null || socket.readyState !== WebSocket.OPEN) {
      throw new WsDisconnectedError('Соединение разорвано');
    }

    socket.send(JSON.stringify(data));
  }

  public close() {
    this.isClosedByUs = true;
    this._socket?.close();
    window.clearInterval(this.timerCancellation);
  }

  private startPing() {
    this.timerCancellation = window.setInterval(() => {
      // Пинг не должен ронять таймер: об обрыве всё равно сообщит close
      try {
        this.send(this._options.pingMessage);
      } catch (e) {
        logger.error(e);
      }
    }, this._options.pingIntervalMs);
  }
}
