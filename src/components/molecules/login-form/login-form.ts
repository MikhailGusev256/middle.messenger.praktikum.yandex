import Form from '../../core/form.ts';

export default class LoginForm extends Form {
  static componentName = 'LoginForm';

  protected template = `
  <form class="login-card__form">
    <div>
        {{{ Input id="login" name="login" type="text" label="Логин" }}}
        {{{ Input id="password" name="password" type="password" label="Пароль" }}}
    </div>
    {{{ Button text="Авторизоваться" type="submit" }}}
  </form>
  `;
}
