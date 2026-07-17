import userService from '../../../services/user/user-service.ts';
import Form from '../../core/form.ts';

export default class RegisterForm extends Form {
  static componentName = 'RegisterForm';

  protected template = `
    <form class="register-card__form">
        <div class="register-card__fields">
            {{{ Input
                id="email"
                name="email"
                type="email"
                label="Почта"
                validationRule="email"  }}}

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
                id="phone"
                name="phone"
                type="tel"
                label="Телефон"
                validationRule="phone" }}}

            {{{ Input
                id="password"
                name="password"
                type="password"
                label="Пароль"
                aria-label="Пароль"
                validationRule="password"
                autocomplete="false" }}}

            {{{ Input
                id="password_repeat"
                name="password_repeat"
                type="password"
                label="Пароль (ещё раз)"
                aria-label="Пароль (ещё раз)"
                validationRule="password"
                autocomplete="false" }}}
            {{{ Error error=error }}}
        </div>
        {{{ Button text="Зарегистрироваться" type="submit"}}}
    </form>
  `;

  protected override async onValidSubmit(
    data: Record<string, FormDataEntryValue>,
  ) {
    const password = data['password'].toString();
    const password_repeat = data['password_repeat'].toString();

    if (password !== password_repeat) {
      this.showError('Пароли не совпадают');
      return;
    }

    this.clearError();

    const firstName = data['first_name'].toString();
    const secondName = data['second_name'].toString();
    const login = data['login'].toString();
    const email = data['email'].toString();
    const phone = data['phone'].toString();

    await userService.register({
      first_name: firstName,
      second_name: secondName,
      login: login,
      email: email,
      phone: phone,
      password: password,
    });
  }
}
