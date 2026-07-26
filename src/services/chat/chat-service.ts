import chatApi from '../../api/chat-api.ts';
import store from '../../store/store.ts';
import messageService from '../message/message-service.ts';
import { SELECTED_CHAT_USERS_KEY } from '../user/user-selectors.ts';
import { toChatPreview } from './chat-preview-data.ts';
import { CHATS_KEY, SELECTED_CHAT_ID_KEY } from './chat-selectors.ts';
import { toChatUser } from './chat-user.ts';

class ChatService {
  public async fetchChats(
    filter?: string,
    offset?: number,
    limit?: number,
  ): Promise<void> {
    const response = await chatApi.getChats({ title: filter, offset, limit });
    const chatPreviews = response.map((c) => toChatPreview(c));
    store.setState(CHATS_KEY, chatPreviews);
  }

  public async createChat(title: string): Promise<void> {
    await chatApi.createChat({ title: title });
    await this.fetchChats();
  }

  public async deleteChat(id: number): Promise<void> {
    await chatApi.deleteChat({ chatId: id });
    await this.fetchChats();
  }

  public async selectChat(chatId: number) {
    await this.refreshChatUsers(chatId);
    await messageService.connectTo(chatId);
    messageService.requestLastMessages();
  }

  public async addUsers(users: number[], chatId: number): Promise<void> {
    await chatApi.addUsers({ users, chatId });
    await this.refreshChatUsers(chatId);
  }

  public async removeUsers(users: number[], chatId: number): Promise<void> {
    await chatApi.removeUsers({ users, chatId });
    await this.refreshChatUsers(chatId);
  }

  private async refreshChatUsers(chatId: number) {
    const chatUserResponseItems = await chatApi.getChatUsers(chatId, {});
    const chatUsers = chatUserResponseItems.map((u) => toChatUser(u));
    store.setState(SELECTED_CHAT_USERS_KEY, chatUsers);
    store.setState(SELECTED_CHAT_ID_KEY, chatId);
  }
}

export default new ChatService();
