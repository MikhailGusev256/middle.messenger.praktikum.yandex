import FormTemplate from '../form-template/form-template.ts';

export default class MessageInput extends FormTemplate {
  static componentName = 'MessageInput';

  protected template = `
  <form class="message-input">
    {{{ Input aria-label="Сообщение" 
    validation-error-text="Введите сообщение" 
    validation-regex=".+"
    class="message-input__field" 
    type="text" 
    name="message" 
    placeholder="Сообщение" 
    autocomplete="off" 
    ref="input"}}}
    {{{ Button text="Отправить" type="submit"}}}
  </form>
  `;
}
