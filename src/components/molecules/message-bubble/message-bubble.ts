import Block from '../../core/block.ts';

export default class MessageBubble extends Block {
  static componentName = 'MessageBubble';

  protected template = `
<div class="message-row{{#if out}} message-row--out{{/if}}">
  <div class="message-bubble{{#if out}} message-bubble--out{{/if}}">
    {{text}}<span class="message-bubble__time{{#if out}} message-bubble__time--out{{/if}}">{{time}}</span>
  </div>
</div>
  `;
}
