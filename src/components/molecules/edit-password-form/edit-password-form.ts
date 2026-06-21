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
        
        {{{ Button text="Сохранить" type="submit" }}}
    </form>
  `;
}
