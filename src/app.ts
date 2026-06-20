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
      currentPage: 'chats',
    };
  }

  addLinkEventListeners() {
    const links = document.querySelectorAll<HTMLElement>('[data-page]');
    links.forEach((link) => {
      link.addEventListener('click', () => {
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
  render() {
    const app = document.getElementById('app');
    if (!app) return;

    app.textContent = '';

    const templateBlock = TemplateMap[this.state.currentPage];
    const context = ContextMap[this.state.currentPage];
    app.appendChild(templateBlock.element());
    templateBlock.setProps(context);

    this.addLinkEventListeners();
  }
}
