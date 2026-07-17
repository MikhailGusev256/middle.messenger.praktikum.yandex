import userService from '../../../services/user/user-service.ts';
import type { User } from '../../../services/user/user.ts';
import Form, { type FormProps } from '../../core/form.ts';

interface EditProfileFormProps extends FormProps {
  user?: User;
}

export default class EditProfileForm extends Form<EditProfileFormProps> {
  static componentName = 'EditProfileForm';

  protected template = `
    <form class="edit-profile-form">
        {{{ Input
            id="email"
            name="email"
            value=user.email
            type="email"
            label="Почта"
            validationRule="email" }}}

        {{{ Input
            id="login"
            name="login"
            value=user.login
            type="text"
            label="Логин"
            validationRule="login"
            aria-label="Логин"
            autocomplete="true" }}}

        {{{ Input
            id="first_name"
            name="first_name"
            value=user.first_name
            validationRule="name"
            type="text"
            label="Имя" }}}

        {{{ Input
            id="second_name"
            name="second_name"
            value=user.second_name
            validationRule="name"
            type="text"
            label="Фамилия" }}}

        {{{ Input
            id="display_name"
            name="display_name"
            value=user.display_name
            validationRule="name"
            type="text"
            label="Имя в чате" }}}

        {{{ Input
            id="phone"
            name="phone"
            value=user.phone
            type="tel"
            label="Телефон"
            validationRule="phone" }}}

        {{{ Error error=error }}}

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
    this.props.onDone?.();
  }
}
