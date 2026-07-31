import type { GetChatsResponseItem } from '../../api/chat-api.ts';
import { resourcesUrl } from '../../api/constants.ts';
import { formatTime } from '../../utils/format-time.ts';

export interface ChatPreviewData {
  id: number;
  name: string;
  message: string;
  time: string;
  dateTime: string;
  count?: number;
  src?: string;
}

export function toChatPreview(dto: GetChatsResponseItem): ChatPreviewData {
  const lastMessage = dto.last_message;

  return {
    id: dto.id,
    name: dto.title,
    message: lastMessage?.content ?? 'Нет сообщений',
    time: lastMessage ? formatTime(lastMessage.time) : '',
    dateTime: lastMessage?.time ?? '',
    count: dto.unread_count,
    src: dto.avatar ? resourcesUrl + '/' + dto.avatar : undefined,
  };
}
