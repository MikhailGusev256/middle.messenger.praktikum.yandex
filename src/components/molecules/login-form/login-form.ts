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
            validation-regex="^(?=.*[a-zA-Z_-])[a-zA-Z0-9_-]{3,20}$"
            validation-error-text="Неверный формат логина"
            aria-label="Логин"
            autocomplete="true" }}}
        {{{ Input 
            id="password" 
            name="password" 
            type="password" 
            label="Пароль" 
            aria-label="Пароль"
            validation-regex="^(?=.*[A-Z])(?=.*\\d).{8,40}$"
            validation-error-text="Неверный формат пароля"
            autocomplete="true" }}}
    </div>
    {{{ Button text="Авторизоваться" type="submit" }}}
  </form>
  `;
}
