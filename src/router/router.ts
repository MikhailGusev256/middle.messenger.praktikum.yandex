import type Block from '../components/core/block.ts';
import type { TemplateNames } from '../components/templates';
import Route from './route.ts';
import { pathByName, routeConfigs } from './routeConfig.ts';

export default class Router {
  private static __instance: Router;

  private readonly _rootElement: Element;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | undefined = undefined;

  static initialize(rootQuery: string): Router {
    if (Router.__instance) {
      return Router.__instance;
    }
    return new Router(rootQuery);
  }

  private constructor(rootQuery: string) {
    const rootElement = document.querySelector(rootQuery);
    if (!rootElement) {
      throw Error('Невозможно найти корневой элемент');
    }
    Router.__instance = this;

    for (const config of routeConfigs) {
      this.use(config.path, config.view);
    }

    this._rootElement = rootElement;
  }

  use(path: string, block: new () => Block) {
    const route = new Route(path, block, {});
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
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render(this._rootElement);
  }

  public go(pathname: TemplateNames) {
    const path = pathByName.get(pathname);
    if (!path) {
      return;
    }
    this.history.pushState({}, '', path);
    this.onRoute(path);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
}
