import userService from '../../../services/user/user-service.ts';
import Form from '../../core/form.ts';

export default class EditProfileForm extends Form {
  static componentName = 'EditProfileForm';

  protected template = `
    <form class="edit-profile-form">
        {{{ Input
            id="email"
            name="email"
            type="email"
            label="Почта"
            validationRule="email" }}}

        {{{ Input
            id="login"
            name="login"
            type="text"
            label="Логин"
            validationRule="login"
            aria-label="Логин"
            autocomplete="true" }}}

        {{{ Input
            id="first_name"
            name="first_name"
            validationRule="name"
            type="text"
            label="Имя" }}}

        {{{ Input
            id="second_name"
            name="second_name"
            validationRule="name"
            type="text"
            label="Фамилия" }}}

        {{{ Input
            id="display_name"
            name="display_name"
            validationRule="name"
            type="text"
            label="Имя в чате" }}}

        {{{ Input
            id="phone"
            name="phone"
            type="tel"
            label="Телефон"
            validationRule="phone" }}}

        {{{ FormError error=error }}}

        {{{ Button text="Сохранить" type="submit" }}}
    </form>
  `;

  protected async onValidSubmit(data: Record<string, FormDataEntryValue>) {
    const email = data['email'].toString();
    const login = data['login'].toString();
    const firstName = data['first_name'].toString();
    const secondName = data['second_name'].toString();
    const displayName = data['display_name'].toString();
    const phone = data['phone'].toString();

    await userService.updateProfile(
      email,
      login,
      firstName,
      secondName,
      displayName,
      phone,
    );
  }
}
