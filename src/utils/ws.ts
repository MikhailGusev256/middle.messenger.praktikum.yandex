type WsTransportOptions = {
  getUrl: () => Promise<string>;
  onMessage: (data: unknown) => void;
  pingMessage: unknown;
  pingIntervalMs: number;
};

export class WsTransport {
  private _options: WsTransportOptions;
  private _socket: WebSocket | null = null;
  private timerCancellation: number | undefined;
  public constructor(options: WsTransportOptions) {
    this._options = options;
  }

  public async connect(): Promise<void> {
    const url = await this._options.getUrl();

    return new Promise<void>((resolve, reject) => {
      const socket = new WebSocket(url);
      this._socket = socket;

      socket.addEventListener('open', () => {
        console.log('Соединение установлено');
        this.timerCancellation = window.setInterval(() => {
          this.send(this._options.pingMessage);
        }, this._options.pingIntervalMs);
        resolve();
      });

      socket.addEventListener('message', (event) => {
        try {
          this._options.onMessage(JSON.parse(event.data));
        } catch (e) {
          console.log(e);
        }
      });

      socket.addEventListener('error', (event) => {
        console.error('Ошибка', event);
        reject(new Error('Ошибка'));
      });

      socket.addEventListener('close', (event) => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }
        window.clearInterval(this.timerCancellation);
        const message = `Код: ${event.code} | Причина: ${event.reason}`;
        reject(new Error(message));
      });
    });
  }

  public send(data: unknown) {
    const socket = this._socket;

    if (socket === null) {
      console.error('Сокет не инициализирован');
      return;
    }

    if (socket.readyState !== WebSocket.OPEN) {
      throw new Error('Соединение разорвано');
    }

    socket.send(JSON.stringify(data));
  }

  public close() {
    this._socket?.close();
    window.clearInterval(this.timerCancellation);
  }
}
