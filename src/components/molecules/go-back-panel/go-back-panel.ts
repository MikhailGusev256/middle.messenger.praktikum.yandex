import Router from '../../../router/router.ts';
import Block, { type EventListType } from '../../core/block.ts';

export default class GoBackPanel extends Block {
  static componentName = 'GoBackPanel';

  protected template = `
  <button aria-label="Назад" class="go-back-panel">
    {{{ BackIcon }}}
  </button>
  `;

  protected events: EventListType = {
    click: (e) => {
      e.preventDefault();
      Router.instance().back();
    },
  };
}
