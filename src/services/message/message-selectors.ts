import type { Indexed } from '../../utils/indexed.ts';
import type { ChatMessage } from './chat-message.ts';

export const MESSAGES_KEY = 'messages';

export function selectCurrentChatMessages(state: Indexed) {
  return (state[MESSAGES_KEY] as ChatMessage[]) ?? [];
}
