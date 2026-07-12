import Router from './router/router';

export default class App {
  private router: Router = Router.initialize('#app');

  start() {
    this.router.start();
  }
}
