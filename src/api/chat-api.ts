import HTTPTransport from '../utils/http.ts';
import { BaseAPI } from './base-api';

const chatAPIInstance = new HTTPTransport('chats');

export class ChatAPI extends BaseAPI {
  create() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return chatAPIInstance.post('/', { data: { title: 'string' } });
  }

  request() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return chatAPIInstance.get('/full');
  }
}
