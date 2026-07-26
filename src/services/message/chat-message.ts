import { formatTime } from '../../utils/format-time.ts';
import type { NewChatMessageDto } from './new-chat-message-dto.ts';
import type { OldChatMessageDto } from './old-chat-message-dto.ts';

export interface ChatMessage {
  text: string;
  out: boolean;
  time: string;
}

export function toMessage(
  data: NewChatMessageDto | OldChatMessageDto,
  currentUserId: number,
): ChatMessage {
  return {
    text: data.content,
    out: Number(data.user_id) === currentUserId,
    time: formatTime(data.time),
  };
}
