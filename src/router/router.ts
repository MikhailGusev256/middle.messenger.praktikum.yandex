import type Block from '../components/core/block.ts';
import type { TemplateNames } from '../components/templates';
import store from '../store/store.ts';
import Route from './route.ts';
import { type RouteConfig } from './routeConfig.ts';
import { RouteVisibility } from './routeVisibility.ts';

export default class Router {
  private static __instance: Router;

  private readonly _rootElement: Element;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | undefined = undefined;
  private pathByName;

  static initialize(rootQuery: string, routes: RouteConfig[]): Router {
    if (Router.__instance) {
      return Router.__instance;
    }
    return new Router(rootQuery, routes);
  }

  static instance(): Router {
    return Router.__instance;
  }

  private constructor(rootQuery: string, routes: RouteConfig[]) {
    const rootElement = document.querySelector(rootQuery);
    if (!rootElement) {
      throw Error('Невозможно найти корневой элемент');
    }
    Router.__instance = this;

    for (const config of routes) {
      this.use(config.path, config.visibility, config.view);
    }

    this.pathByName = new Map(routes.map((c) => [c.name, c.path]));

    this._rootElement = rootElement;
  }

  use(path: string, visibility: RouteVisibility, block: new () => Block) {
    const route = new Route(path, visibility, block, {});
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = () => {
      this.onRoute(window.location.pathname);
    };

    this.onRoute(window.location.pathname);
  }

  private onRoute(path: string): void {
    const route = this.routes.find((route) => route.match(path));
    if (!route) {
      this.go('error404', true);
      return;
    }

    const user = store.getState()['user'];

    if (route.visibility === RouteVisibility.OnlyForAnonymous && user != null) {
      this.go('chats', true);
      return;
    }

    if (route.visibility === RouteVisibility.OnlyForLoggedIn && user == null) {
      this.go('login', true);
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render(this._rootElement);
  }

  public go(pathname: TemplateNames, replaceState?: boolean) {
    const path = this.pathByName.get(pathname);
    if (!path) {
      throw new Error('Не удалось найти путь для шаблона');
    }
    if (replaceState) {
      this.history.replaceState({}, '', path);
    } else {
      this.history.pushState({}, '', path);
    }
    this.onRoute(path);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
}
