import type { UserResponse } from '../../api/auth-api.ts';
import { resourcesUrl } from '../../api/constants.ts';

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string | null;
  email: string;
};

export function toUser(dto: UserResponse): User {
  return {
    id: dto.id,
    first_name: dto.first_name,
    second_name: dto.second_name,
    display_name: dto.display_name ?? dto.first_name,
    phone: dto.phone,
    login: dto.login,
    avatar: dto.avatar ? resourcesUrl + '/' + dto.avatar : null,
    email: dto.email,
  };
}
