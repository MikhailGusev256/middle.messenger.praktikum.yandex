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
  user: LastUserMessage;
  time: string;
  content: string;
};

export type LastUserMessage = {
  first_name: string;
  second_name: string;
  avatar: string | null;
  email: string;
  login: string;
  phone: string;
};

export type ChatUserResponseItem = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string | null;
  role: string;
};

export type CreateChatRequest = {
  title: string;
};

export type DeleteChatRequest = {
  chatId: number;
};

export type DeleteChatResponse = {
  userId: number;
  result: DeleteChatResult;
};

export type DeleteChatResult = {
  id: number;
  title: string;
  avatar: string;
  created_by: number;
};

export type CreateChatResponse = {
  id: number;
};

export type ChangeUsersRequest = {
  users: number[];
  chatId: number;
};

export type GetChatUsersRequest = {
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
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

  public deleteChat(request: DeleteChatRequest) {
    return this.delete<DeleteChatResponse>('/', { data: request });
  }

  public addUsers(request: ChangeUsersRequest) {
    return this.put('/users', { data: request });
  }

  public removeUsers(request: ChangeUsersRequest) {
    return this.delete('/users', { data: request });
  }

  getChatUsers(chatId: number, request: GetChatUsersRequest) {
    return this.get<ChatUserResponseItem[]>(`/${chatId}/users`, {
      queryParameters: request,
    });
  }
}

export default new ChatAPI('chats');
