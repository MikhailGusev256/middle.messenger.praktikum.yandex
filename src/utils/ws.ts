type WsTransportOptions = {
  getUrl: () => Promise<string>;
  onMessage: (data: unknown) => void;
  pingMessage?: unknown;
  pingIntervalMs?: number;
};

export class WsTransport {
  private _options: WsTransportOptions;
  private _socket: WebSocket | null = null;
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

    socket.send(JSON.stringify(data));
  }

  public close() {
    this._socket?.close();
  }
}
