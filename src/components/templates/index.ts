export const templateNames = [
  'login',
  'register',
  'chats',
  'profile',
  'error404',
  'error500',
] as const;

export type TemplateNames = (typeof templateNames)[number];
