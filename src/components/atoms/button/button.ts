import Block from '../../core/block.ts';

export default class Button extends Block {
  static componentName = 'Button';

  protected template = `
    <button class="button" type="{{type}}" data-page="{{data-page}}">{{text}}</button>
  `;
}
