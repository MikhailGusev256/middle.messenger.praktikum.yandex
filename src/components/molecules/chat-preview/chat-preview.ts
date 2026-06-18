import Block from '../../core/block.ts';

export default class ChatPreview extends Block {
  static componentName = 'ChatPreview';

  protected template = `
  <button type="button" class="chat-preview">
    {{{ Avatar name=name src=src }}}
    <span class="chat-preview__content">
        <strong class="chat-preview__name">{{name}}</strong>
        <span class="chat-preview__message">{{message}}</span>
    </span>
    <span class="chat-preview__meta">
        <time class="chat-preview__time" datetime="{{dateTime}}">{{time}}</time>
        {{#if count}}
            {{{ Badge text=count }}}
        {{/if}}
    </span>
  </button>
  `;
}
