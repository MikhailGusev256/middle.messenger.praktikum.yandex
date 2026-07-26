import type { Indexed } from '../../utils/indexed.ts';
import type { User } from './user.ts';

export function selectUser(state: Indexed): User | undefined {
  return state['user'] as User;
}

export function selectUserId(state: Indexed): number {
  const user = selectUser(state);
  if (!user) {
    throw new Error('Нет текущего пользователя');
  }
  return user?.id;
}
