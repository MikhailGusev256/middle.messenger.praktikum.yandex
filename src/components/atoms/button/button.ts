import Block from '../../core/block.ts';

export default class Button extends Block {
  protected template = `
    <button class="button" type="{{type}}" data-page="{{data-page}}">{{text}}</button>
  `;

  static componentName = 'Button';
}
