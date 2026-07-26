import type { Indexed } from '../../utils/indexed.ts';
import type { ChatMessage } from './chat-message.ts';

export function selectCurrentChatMessages(state: Indexed) {
  return (state['messages'] as ChatMessage[]) ?? [];
}
