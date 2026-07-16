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

export type CreateChatRequest = {
  title: string;
};

export type CreateChatResponse = {
  id: number;
};

export type ChangeUsersRequest = {
  users: number[];
  chatId: number;
};

class ChatAPI extends BaseAPI {
  public getChats(request: GetChatsRequest = {}) {
    return this.get<GetChatsResponseItem[]>('/', {
      queryParameters: request,
    });
  }

  public createChat(request: CreateChatRequest) {
    return this.post<CreateChatResponse>('/', { data: request });
  }

  public addUsers(request: ChangeUsersRequest) {
    return this.put('/users', { data: request });
  }

  public removeUsers(request: ChangeUsersRequest) {
    return this.delete('/users', { data: request });
  }
}

export default new ChatAPI('chats');
