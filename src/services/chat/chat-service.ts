import chatApi from '../../api/chat-api.ts';
import store from '../../store/store.ts';
import { toChatPreview } from './chat-preview-data.ts';

class ChatService {
  public async fetchChats(): Promise<void> {
    const response = await chatApi.getChats();
    const chatPreviews = response.map((c) => toChatPreview(c));
    store.setState('chats', chatPreviews);
  }

  public async createChat(title: string): Promise<void> {
    await chatApi.createChat({ title: title });
    await this.fetchChats();
  }

  public async addUsers(users: number[], chatId: number): Promise<void> {
    await chatApi.addUsers({ users, chatId });
    await this.fetchChats();
  }

  public async removeUsers(users: number[], chatId: number): Promise<void> {
    await chatApi.removeUsers({ users, chatId });
    await this.fetchChats();
  }
}

export default new ChatService();
