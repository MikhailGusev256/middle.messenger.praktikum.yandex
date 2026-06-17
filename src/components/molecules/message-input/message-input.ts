import Block from '../../core/block.ts';

export default class MessageInput extends Block {
  protected template = `
  <form class="message-input">
    <input aria-label="Сообщение" class="message-input__field" type="text" name="message" placeholder="Сообщение" autocomplete="off"/>
    {{{ Button text="Отправить" type="submit"}}}
  </form>
  `;

  static componentName = 'MessageInput';
}
