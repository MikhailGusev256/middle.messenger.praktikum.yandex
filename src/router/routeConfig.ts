import type Block from '../components/core/block.ts';
import type { TemplateNames } from '../components/templates';
import chatsTmpl from '../components/templates/chats';
import errorTmpl from '../components/templates/error';
import loginTmpl from '../components/templates/login';
import profileTmpl from '../components/templates/profile';
import registerTmpl from '../components/templates/register';
import { RouteVisibility } from './routeVisibility.ts';

export type RouteConfig = {
  name: TemplateNames;
  path: string;
  view: new () => Block;
  visibility: RouteVisibility;
};

export const routeConfigs: RouteConfig[] = [
  {
    name: 'login',
    path: '/',
    view: loginTmpl,
    visibility: RouteVisibility.OnlyForAnonymous,
  },
  {
    name: 'register',
    path: '/sign-up',
    view: registerTmpl,
    visibility: RouteVisibility.OnlyForAnonymous,
  },
  {
    name: 'chats',
    path: '/messenger',
    view: chatsTmpl,
    visibility: RouteVisibility.OnlyForLoggedIn,
  },
  {
    name: 'profile',
    path: '/settings',
    view: profileTmpl,
    visibility: RouteVisibility.OnlyForLoggedIn,
  },
  {
    name: 'error404',
    path: '/404',
    view: errorTmpl.Error404,
    visibility: RouteVisibility.ForEveryone,
  },
  {
    name: 'error500',
    path: '/500',
    view: errorTmpl.Error500,
    visibility: RouteVisibility.ForEveryone,
  },
] as const;
