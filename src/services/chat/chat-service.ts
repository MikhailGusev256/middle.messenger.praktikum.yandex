import chatApi from '../../api/chat-api.ts';
import store from '../../store/store.ts';
import { toChatPreview } from './chat-preview-data.ts';

class ChatService {
  public async fetchChats(): Promise<void> {
    const response = await chatApi.getChats();
    const chatPreviews = response.map((c) => toChatPreview(c));
    store.setState('chats', chatPreviews);
  }
}

export default new ChatService();
