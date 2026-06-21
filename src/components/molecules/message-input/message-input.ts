import Form from '../../core/form.ts';

export default class MessageInput extends Form {
  static componentName = 'MessageInput';

  protected template = `
  <form class="message-input">
    {{{ Input aria-label="Сообщение" 
    validation-regex=(validationRegex "notEmpty")
    validation-error-text=(validationError "notEmpty")
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
