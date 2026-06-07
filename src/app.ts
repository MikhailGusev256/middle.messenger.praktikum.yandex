import Handlebars from 'handlebars';

import './components/atoms';
import './components/helpers';
import './components/molecules';
import './components/organisms';
import {
  ContextMap,
  TemplateMap,
  type TemplateName,
} from './components/templates';

export default class App {
  private state: {
    currentPage: TemplateName;
  };

  constructor() {
    this.state = {
      currentPage: 'profile',
    };
  }

  render() {
    const app = document.getElementById('app');
    if (!app) return;

    const templateDelegate = TemplateMap[this.state.currentPage];

    const html = Handlebars.compile(templateDelegate);
    app.innerHTML = html(ContextMap[this.state.currentPage]);

    this.addLinkEventListeners();
  }

  addLinkEventListeners() {
    const links = document.querySelectorAll<HTMLElement>('[data-page]');
    links.forEach((link) => {
      link.addEventListener('click', (_) => {
        const page = link.dataset.page;
        if (this.isTemplateName(page)) {
          this.state.currentPage = page;
          this.render();
        }
      });
    });
  }
  isTemplateName(value: string | undefined): value is TemplateName {
    return value != undefined && value in TemplateMap;
  }
}
