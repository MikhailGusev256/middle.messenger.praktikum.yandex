import Block from '../../core/block.ts';

export default class Link extends Block {
  protected template = `
  <a href="#" class="link{{#if danger}} link--danger{{/if}}" data-page="{{data-page}}">{{text}}</a>
  `;

  static componentName = 'Link';
}
