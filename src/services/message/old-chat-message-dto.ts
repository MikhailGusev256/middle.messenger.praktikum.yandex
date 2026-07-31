export interface OldChatMessageDto {
  chat_id: number;
  time: string;
  type: 'message' | 'file' | 'sticker';
  user_id: string;
  content: string;
  file?: ChatMessageFileDto;
}

export interface ChatMessageFileDto {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}
