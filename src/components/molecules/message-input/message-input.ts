import Block from '../../core/block.ts';

export default class MessageInput extends Block {
  static componentName = 'MessageInput';

  protected events = {
    submit: (e: Event) => {
      e.preventDefault();
      if (!(e.target instanceof HTMLFormElement)) {
        return;
      }
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const obj = Object.fromEntries(data);
      console.log(obj);
    },
  };

  protected template = `
  <form class="message-input">
    <input aria-label="Сообщение" class="message-input__field" type="text" name="message" placeholder="Сообщение" autocomplete="off"/>
    {{{ Button text="Отправить" type="submit"}}}
  </form>
  `;
}
