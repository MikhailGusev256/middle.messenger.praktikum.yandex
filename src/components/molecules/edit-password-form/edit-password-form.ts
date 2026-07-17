import userService from '../../../services/user/user-service.ts';
import Form from '../../core/form.ts';

export default class EditPasswordForm extends Form {
  static componentName = 'EditPasswordForm';

  protected template = `
    <form class="edit-password-form">
        {{{ Input
            id="old_password"
            name="old_password"
            type="password"
            label="Старый пароль"
            aria-label="Старый пароль"
            validationRule="password"
            autocomplete="false" }}}

        {{{ Input
            id="new_password"
            name="new_password"
            type="password"
            label="Новый пароль"
            aria-label="Новый пароль"
            validationRule="password"
            autocomplete="false" }}}

        {{{ Input
            id="new_password_repeat"
            name="new_password_repeat"
            type="password"
            label="Повторите новый пароль"
            aria-label="Повторите новый пароль"
            validationRule="password"
            autocomplete="false" }}}

        {{{ Error error=error }}}

        {{{ Button text="Сохранить" type="submit" }}}
    </form>
  `;

  protected async onValidSubmit(data: Record<string, FormDataEntryValue>) {
    const newPassword = data['new_password'].toString();
    const newPasswordRepeat = data['new_password_repeat'].toString();
    if (newPassword !== newPasswordRepeat) {
      this.showError('Пароли не совпадают');
      return;
    }

    const oldPassword = data['old_password'].toString();

    await userService.updatePassword(oldPassword, newPassword);
  }
}
