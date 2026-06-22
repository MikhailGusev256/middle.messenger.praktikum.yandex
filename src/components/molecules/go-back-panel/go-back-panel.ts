import Block from '../../core/block.ts';

export default class GoBackPanel extends Block {
  static componentName = 'GoBackPanel';

  protected template = `
  <button aria-label="Назад" class="go-back-panel" data-page="chats">
    {{{ BackIcon }}}
  </button>
  `;
}
