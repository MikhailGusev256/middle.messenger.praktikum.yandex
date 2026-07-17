import type { ChatUserResponseItem } from '../../api/chat-api.ts';
import { resourcesUrl } from '../../api/constants.ts';

export type ChatUser = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string | null;
  role: string;
};

export function toChatUser(dto: ChatUserResponseItem): ChatUser {
  return {
    id: dto.id,
    first_name: dto.first_name,
    second_name: dto.second_name,
    display_name: dto.display_name ?? dto.first_name,
    login: dto.login,
    avatar: dto.avatar ? resourcesUrl + '/' + dto.avatar : null,
    role: dto.role,
  };
}
