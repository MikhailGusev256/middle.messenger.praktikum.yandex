import Block from '../../core/block.ts';

export default class IconButton extends Block {
  protected template = `
  <button class="icon-button" type="button">
    {{> @partial-block}}
  </button>
  `;

  static componentName = 'IconButton';
}
