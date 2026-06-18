import Block from '../../core/block.ts';

export default class Avatar extends Block {
  static componentName = 'Avatar';

  protected template = `
  {{#if src}}
    <img class="avatar" alt="{{name}}" src="{{src}}"/>
  {{else}}
      <div class="avatar avatar--placeholder">{{firstLetter name}}</div>
  {{/if}}
  `;
}
