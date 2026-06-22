import Block from '../../core/block.ts';

export default class IconButton extends Block {
  static componentName = 'IconButton';

  protected template = `
  <button class="icon-button" type="button">
    {{> @partial-block}}
  </button>
  `;
}
