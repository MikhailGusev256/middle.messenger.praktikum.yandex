import Block from '../../core/block.ts';

export default class GoBackPanel extends Block {
  protected template = `
  <button aria-label="Назад" class="go-back-panel" data-page="chats">
    {{{ BackIcon }}}
  </button>
  `;

  static componentName = 'GoBackPanel';
}
