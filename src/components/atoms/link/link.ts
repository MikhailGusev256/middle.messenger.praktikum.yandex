import Block from '../../core/block.ts';

export default class Link extends Block {
  static componentName = 'Link';

  protected template = `
  <a href="#" class="link{{#if danger}} link--danger{{/if}}" data-page="{{data-page}}" >{{text}}</a>
  `;
}
