import type Block from '../core/block.ts';
import chatsTmpl from './chats';
import { chats } from './chats/data';
import errorTmpl from './error';
import loginTmpl from './login';
import profileTmpl from './profile';
import registerTmpl from './register';

export type TemplateName =
  | 'login'
  | 'register'
  | 'chats'
  | 'profile'
  | 'error404'
  | 'error500';

export const TemplateMap: Record<TemplateName, Block> = {
  login: new loginTmpl(),
  register: new registerTmpl(),
  chats: new chatsTmpl(),
  profile: new profileTmpl(),
  error404: new errorTmpl(),
  error500: new errorTmpl(),
};

export const ContextMap: Record<TemplateName, Record<string, unknown>> = {
  login: {},
  register: {},
  chats: { chats },
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
