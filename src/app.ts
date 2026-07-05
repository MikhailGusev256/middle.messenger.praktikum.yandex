import './components/atoms';
import './components/helpers';
import './components/molecules';
import './components/organisms';
import {
  // ContextMap,
  type TemplateNames,
} from './components/templates';

import Router from './router/router';

export default class App {
  static initialPage: TemplateNames = 'profile';
  // private state: {
  // };
  private router: Router = Router.initialize('#app');

  constructor() {
    // this.state = {
    //   currentPage: 'login',
    // };
  }

  start() {
    // const context = ContextMap[this.state.currentPage];
    this.router.start();
    this.router.go(App.initialPage);
  }
}
