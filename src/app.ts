import './components/atoms';
import './components/helpers';
import './components/molecules';
import './components/organisms';
import {
  // ContextMap,
  type TemplateNames,
  templateNames,
} from './components/templates';

import Router from './router/router';

export default class App {
  static initialPage: TemplateNames = 'login';
  // private state: {
  // };
  private router: Router = Router.initialize('#app');

  constructor() {
    // this.state = {
    //   currentPage: 'login',
    // };
  }

  addLinkEventListeners() {
    const links = document.querySelectorAll<HTMLElement>('[data-page]');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        const page = link.dataset.page;
        if (this.isTemplateName(page)) {
          this.router.go(page);
        }
      });
    });
  }

  isTemplateName(value: string | undefined): value is TemplateNames {
    return (
      value != undefined && (templateNames as readonly string[]).includes(value)
    );
  }

  start() {
    // const context = ContextMap[this.state.currentPage];
    this.router.start();
    this.router.go(App.initialPage);
    this.addLinkEventListeners();
  }
}
