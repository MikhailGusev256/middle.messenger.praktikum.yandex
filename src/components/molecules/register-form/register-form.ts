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
        </div>
        {{{ Button text="Зарегистрироваться" type="submit"}}}
    </form>
  `;
}
