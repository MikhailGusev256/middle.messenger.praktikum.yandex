import type { Indexed } from '../../utils/indexed.ts';
import type { ChatPreviewData } from './chat-preview-data.ts';
import type { ChatUser } from './chat-user.ts';

export const CHATS_KEY = 'chats';
export const SELECTED_CHAT_ID_KEY = 'selectedChatId';
export const SELECTED_CHAT_USERS_KEY = 'selectedChatUsers';

export function selectChatPreviews(state: Indexed): ChatPreviewData[] {
  return (state[CHATS_KEY] as ChatPreviewData[]) ?? [];
}

export function selectSelectedChatId(state: Indexed): number | undefined {
  return state[SELECTED_CHAT_ID_KEY] as number | undefined;
}

export function selectChatUsers(state: Indexed): ChatUser[] {
  return (state[SELECTED_CHAT_USERS_KEY] as ChatUser[]) ?? [];
}
