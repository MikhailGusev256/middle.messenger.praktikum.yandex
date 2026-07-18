import Router from '../../../router/router.ts';
import Block, {
  type BlockOwnProps,
  type EventListType,
} from '../../core/block.ts';
import type { TemplateNames } from '../../templates';

interface LinkProps extends BlockOwnProps {
  page: TemplateNames;
  text: string;
  danger?: boolean;
}

export default class Link extends Block<LinkProps> {
  static componentName = 'Link';

  protected template = `
  <a href="#"
     class="link">
     {{text}}
  </a>
  `;

  protected events: EventListType = {
    click: (e) => {
      e.preventDefault();
      Router.instance().go(this.props.page);
    },
  };
}
