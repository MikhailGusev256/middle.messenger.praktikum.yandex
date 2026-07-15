import './components/atoms';
import './components/helpers';
import './components/molecules';
import './components/organisms';

import Router from './router/router';
import userService from './services/user/user-service.ts';

export default class App {
  private router: Router = Router.initialize('#app');

  start() {
    userService
      .fetchUser()
      .catch(() => {})
      .finally(() => this.router.start());
  }
}
