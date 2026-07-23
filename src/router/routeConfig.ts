import type Block from '../components/core/block.ts';
import type { TemplateNames } from '../components/templates';
import chatsTmpl from '../components/templates/chats';
import errorTmpl from '../components/templates/error';
import loginTmpl from '../components/templates/login';
import profileTmpl from '../components/templates/profile';
import registerTmpl from '../components/templates/register';

export type RouteConfig = {
  name: TemplateNames;
  path: string;
  view: new () => Block;
  public: boolean;
};

export const routeConfigs: RouteConfig[] = [
  {
    name: 'login',
    path: '/',
    view: loginTmpl,
    public: true,
  },
  {
    name: 'register',
    path: '/sign-up',
    view: registerTmpl,
    public: true,
  },
  {
    name: 'chats',
    path: '/messenger',
    view: chatsTmpl,
    public: false,
  },
  {
    name: 'profile',
    path: '/settings',
    view: profileTmpl,
    public: false,
  },
  {
    name: 'error404',
    path: '/404',
    view: errorTmpl.Error404,
    public: true,
  },
  {
    name: 'error500',
    path: '/500',
    view: errorTmpl.Error500,
    public: true,
  },
] as const;
