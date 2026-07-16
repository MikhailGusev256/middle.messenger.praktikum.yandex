import { BaseAPI } from './base-api';

export type GetChatsRequest = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type GetChatsResponseItem = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: MessageResponse | null;
};

export type MessageResponse = {
  user: LastMessageUser;
  time: string;
  content: string;
};

export type LastMessageUser = {
  first_name: string;
  second_name: string;
  avatar: string | null;
  email: string;
  login: string;
  phone: string;
};

class ChatAPI extends BaseAPI {
  public getChats(request: GetChatsRequest = {}) {
    return this.get<GetChatsResponseItem[]>('/', {
      queryParameters: request,
    });
  }
}

export default new ChatAPI('chats');
