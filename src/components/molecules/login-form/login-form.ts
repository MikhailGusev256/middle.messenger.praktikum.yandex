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
            validation-regex=(validationRegex "login")
            validation-error-text=(validationError "login")
            aria-label="Логин"
            autocomplete="true" }}}
        {{{ Input 
            id="password" 
            name="password" 
            type="password" 
            label="Пароль" 
            aria-label="Пароль"
            validation-regex=(validationRegex "password")
            validation-error-text=(validationError "password")
            autocomplete="true" }}}
    </div>
    {{{ Button text="Авторизоваться" type="submit" }}}
  </form>
  `;
}
