import { beforeEach, describe, expect, it, vi } from 'vitest';
import Block from '../components/core/block.ts';
import type { RouteConfig } from './routeConfig.ts';
import type Router from './router.ts';
const mocks = vi.hoisted(() => ({
  getState: vi.fn(),
}));

vi.mock('../store/store.ts', () => ({
  default: { getState: mocks.getState, subscribe: vi.fn() },
}));

class StubBlock extends Block {
  protected template = '<div></div>';
}

const stubRoutes: RouteConfig[] = [
  { name: 'login', path: '/', view: StubBlock, public: true },
  { name: 'chats', path: '/messenger', view: StubBlock, public: false },
  { name: 'error404', path: '/404', view: StubBlock, public: true },
];

describe('Router', () => {
  let RouterClass: typeof Router;
  beforeEach(async () => {
    vi.resetModules();
    mocks.getState.mockReturnValue({});
    document.body.innerHTML = '<div id="app"></div>';
    ({ default: RouterClass } = await import('./router.ts'));
  });

  it('start заполняет коллбэк window.onpopstate', () => {
    const router = RouterClass.initialize('#app', stubRoutes);
    router.start();
    expect(typeof window.onpopstate).equal('function');
  });

  it('start редиректит на 404 если путь отсутствует', () => {
    window.history.pushState({}, '', '/notExistingPath');
    const router = RouterClass.initialize('#app', stubRoutes);
    router.start();
    expect(window.location.pathname).equal('/404');
  });

  it('start редиректит на chats, если страница публичная и пользователь залогинен', () => {
    mocks.getState.mockReturnValue({ user: {} });
    window.history.pushState({}, '', '/');
    const router = RouterClass.initialize('#app', stubRoutes);
    router.start();
    expect(window.location.pathname).equal('/messenger');
  });
});
