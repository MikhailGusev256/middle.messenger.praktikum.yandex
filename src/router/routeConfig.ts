import chatsTmpl from '../components/templates/chats';
import errorTmpl from '../components/templates/error';
import loginTmpl from '../components/templates/login';
import profileTmpl from '../components/templates/profile';
import registerTmpl from '../components/templates/register';

export const routeConfigs = [
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
    public: false,
  },
  {
    name: 'error500',
    path: '/500',
    view: errorTmpl.Error500,
    public: false,
  },
] as const;
export const pathByName = new Map(routeConfigs.map((c) => [c.name, c.path]));
