import chatApi from '../../api/chat-api.ts';
import store from '../../store/store.ts';
import { WsTransport } from '../../utils/ws.ts';
import { selectUserId } from '../user/user-selectors.ts';
import { toMessage } from './chat-message.ts';
import { selectCurrentChatMessages } from './message-selectors.ts';
import type { NewChatMessageDto } from './new-chat-message-dto.ts';
import type { OldChatMessageDto } from './old-chat-message-dto.ts';

export class MessageService {
  private _transport: WsTransport;

  constructor(chatId: number) {
    this._transport = new WsTransport({
      getUrl: () => this.getTransportUrl(chatId),
      onMessage: (data) => this.storeReceivedMessages(data),
    });
  }

  public initialize(): Promise<void> {
    return this._transport.connect();
  }

  public cleanUp() {
    this._transport.close();
  }

  public sendMessage(message: string) {
    this._transport.send({
      content: message,
      type: 'message',
    });
  }

  public requestLastMessages() {
    return this.requestMessages(0);
  }

  public requestMessages(offset: number) {
    this._transport.send({
      content: offset.toString(),
      type: 'get old',
    });
  }

  private async getTransportUrl(chatId: number) {
    const chatToken = await chatApi.getChatToken(chatId);
    const userId = selectUserId(store.getState());
    const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const host = window.location.host;
    return `${scheme}://${host}/ws/chats/${userId}/${chatId}/${chatToken}`;
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
