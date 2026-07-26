import type { Indexed } from '../../utils/indexed.ts';
import type { ChatPreviewData } from './chat-preview-data.ts';

export function selectChatPreviews(state: Indexed): ChatPreviewData[] {
  return (state['chats'] as ChatPreviewData[]) ?? [];
}

export function selectSelectedChatId(state: Indexed) {
  return state['selectedChatId'] as number;
}
