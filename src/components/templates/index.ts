import chatService from '../../services/chat/chat-service.ts';

export const templateNames = [
  'login',
  'register',
  'chats',
  'profile',
  'error404',
  'error500',
] as const;

export type TemplateNames = (typeof templateNames)[number];

const chatData = {
  chats: chatService.getChatPreviews(),
  chatMessages: chatService.getChatMessages(),
};

export const ContextMap: Record<TemplateNames, Record<string, unknown>> = {
  login: {},
  register: {},
  chats: { chatData },
  profile: {},
  error404: {
    errorCode: '404',
    errorMessage: 'Не туда попали',
  },
  error500: {
    errorCode: '500',
    errorMessage: 'Уже фиксим',
  },
};
