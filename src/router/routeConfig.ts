import type Block from '../components/core/block.ts';
import type { TemplateNames } from '../components/templates';

import chatsTmpl from '../components/templates/chats';
import errorTmpl from '../components/templates/error';
import loginTmpl from '../components/templates/login';
import profileTmpl from '../components/templates/profile';
import registerTmpl from '../components/templates/register';

export interface RouteConfig {
  name: TemplateNames;
  path: string;
  view: new () => Block;
}

export const routeConfigs: RouteConfig[] = [
  {
    name: 'login',
    path: '/',
    view: loginTmpl,
  },
  {
    name: 'register',
    path: '/sign-up',
    view: registerTmpl,
  },
  {
    name: 'chats',
    path: '/messenger',
    view: chatsTmpl,
  },
  {
    name: 'profile',
    path: '/settings',
    view: profileTmpl,
  },
  {
    name: 'error404',
    path: '/404',
    view: errorTmpl,
  },
  {
    name: 'error500',
    path: '/500',
    view: errorTmpl,
  },
];

export const pathByName = new Map(routeConfigs.map((c) => [c.name, c.path]));
