import messageService from '../../../services/message/message-service.ts';
import Form from '../../core/form.ts';
import Input from '../input/input.ts';

export default class MessageInput extends Form {
  static componentName = 'MessageInput';

  protected template = `
  <form class="message-input">
    {{{ Input aria-label="Сообщение"
          validationRule="notEmpty"
          class="message-input__field"
          type="text"
          name="message"
          placeholder="Сообщение"
          autocomplete="off"
          ref="input"}}}
    {{{ Button text="Отправить" type="submit"}}}
  </form>
  `;

  protected async onValidSubmit(
    data: Record<string, FormDataEntryValue>,
  ): Promise<void> {
    const message = data['message'].toString();
    messageService.sendMessage(message);
    const input = this.children.find((c) => c instanceof Input);
    if (input === undefined) {
      console.error('Не удалось очистить поле ввода');
      return;
    }
    input.clear();
  }
}
