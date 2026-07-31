export interface NewChatMessageDto {
  id: string;
  time: string;
  user_id: string;
  content: string;
  type: 'message';
}
