import chatApi from '../../api/chat-api.ts';
import { wsOrigin } from '../../api/constants.ts';
import store from '../../store/store.ts';
import { ApiError, WsDisconnectedError } from '../../utils/errors.ts';
import { WsTransport } from '../../utils/ws.ts';
import logger from '../log/console-logger.ts';
import { selectUserId } from '../user/user-selectors.ts';
import { toMessage } from './chat-message.ts';
import {
  MESSAGES_KEY,
  selectCurrentChatMessages,
} from './message-selectors.ts';
import type { NewChatMessageDto } from './new-chat-message-dto.ts';
import type { OldChatMessageDto } from './old-chat-message-dto.ts';

class MessageService {
  private _transport: WsTransport | null = null;

  public async connectTo(chatId: number): Promise<void> {
    this.disconnect();
    this._transport = new WsTransport({
      getUrl: () => this.getTransportUrl(chatId),
      onMessage: (data) => this.storeReceivedMessages(data),
      onDisconnect: (error) => logger.error(error),
      pingIntervalMs: 30_000,
      pingMessage: { type: 'ping' },
    });
    try {
      await this._transport.connect();
    } catch (error) {
      throw this.toApiError(error);
    }
  }

  public disconnect() {
    this._transport?.close();
    this._transport = null;
    this.clearMessages();
  }

  public sendMessage(message: string) {
    this.send({
      content: message,
      type: 'message',
    });
  }

  public requestLastMessages() {
    return this.requestMessages(0);
  }

  public requestMessages(offset: number) {
    this.send({
      content: offset.toString(),
      type: 'get old',
    });
  }

  private send(frame: unknown) {
    if (this._transport === null) {
      throw new ApiError('Нет подключения к чату');
    }
    try {
      this._transport.send(frame);
    } catch (error) {
      throw this.toApiError(error);
    }
  }

  /**
   * Приводит ошибки сокета к тому же виду, что BaseAPI даёт для HTTP:
   * наружу из сервиса выходит только ApiError с текстом для пользователя.
   */
  private toApiError(error: unknown): ApiError {
    if (error instanceof ApiError) {
      return error;
    }
    if (error instanceof WsDisconnectedError) {
      return new ApiError('Соединение с чатом потеряно. Обновите страницу');
    }
    return new ApiError('Неопознанная ошибка');
  }

  private clearMessages() {
    store.setState(MESSAGES_KEY, []);
  }

  private async getTransportUrl(chatId: number) {
    const chatToken = await chatApi.getChatToken(chatId);
    const userId = selectUserId(store.getState());
    return `${wsOrigin}/ws/chats/${userId}/${chatId}/${chatToken}`;
  }

  private storeReceivedMessages(data: unknown) {
    const state = store.getState();
    const userId = selectUserId(state);
    if (this.isSingleMessage(data)) {
      const message = toMessage(data, userId);
      const currentMessages = selectCurrentChatMessages(state);
      store.setState('messages', [...currentMessages, message]);
    }
    if (this.isMessageArray(data)) {
      const messages = data
        .filter((m) => m.type === 'message')
        .map((m) => toMessage(m, userId));
      const orderedMessages = messages.reverse();

      store.setState('messages', orderedMessages);
    }
  }

  private isSingleMessage(data: unknown): data is NewChatMessageDto {
    return (
      typeof data === 'object' &&
      data !== null &&
      'type' in data &&
      data['type'] === 'message'
    );
  }
  private isMessageArray(data: unknown): data is OldChatMessageDto[] {
    return Array.isArray(data);
  }
}

export default new MessageService();
