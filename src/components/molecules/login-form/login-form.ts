import Form from '../../core/form.ts';

export default class LoginForm extends Form {
  static componentName = 'LoginForm';

  protected template = `
  <form class="login-card__form">
    <div>
        {{{ Input 
            id="login" 
            name="login" 
            type="text" 
            label="Логин" 
            validationRule="login"
            aria-label="Логин"
            autocomplete="true" }}}
        {{{ Input 
            id="password" 
            name="password" 
            type="password" 
            label="Пароль" 
            aria-label="Пароль"
            validationRule="password"
            autocomplete="true" }}}
    </div>
    {{{ Button text="Авторизоваться" type="submit" }}}
  </form>
  `;
}
