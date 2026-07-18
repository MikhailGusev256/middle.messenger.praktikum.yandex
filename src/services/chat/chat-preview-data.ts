import type { GetChatsResponseItem } from '../../api/chat-api.ts';
import { resourcesUrl } from '../../api/constants.ts';

export interface ChatPreviewData {
  id: number;
  name: string;
  message: string;
  time: string;
  dateTime: string;
  count?: number;
  src?: string;
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  const isToday = date.toDateString() === new Date().toDateString();

  return isToday
    ? date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    : date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
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
