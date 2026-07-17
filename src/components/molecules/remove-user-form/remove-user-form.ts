import chatService from '../../../services/chat/chat-service.ts';
import userService from '../../../services/user/user-service.ts';
import Form, { type FormProps } from '../../core/form.ts';

interface RemoveUserFormProps extends FormProps {
  chatId: number;
}

export default class RemoveUserForm extends Form<RemoveUserFormProps> {
  static componentName = 'RemoveUserForm';

  protected template = `
    <form class="remove-user-form">
        {{{ Input
            id="login"
            name="login"
            type="text"
            label="Логин пользователя"
            aria-label="Логин пользователя"
            validationRule="login"
            autocomplete="off" }}}

        {{{ FormError error=error }}}

        {{{ Button text="Удалить" type="submit" }}}
    </form>
  `;

  protected async onValidSubmit(data: Record<string, FormDataEntryValue>) {
    const login = data['login'].toString();
    const users = await userService.getUsersByLogin(login);
    if (users.length > 1) {
      this.showError('Найдено более одного пользователя. Сузьте поиск');
      return;
    }
    if (users.length == 0) {
      this.showError('Пользователи с таким логином не найдены');
      return;
    }
    const userId = users[0].id;
    await chatService.removeUsers([userId], this.props.chatId);
    this.props.onDone?.();
  }
}
