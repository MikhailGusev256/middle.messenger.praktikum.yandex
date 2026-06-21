import Form from '../../core/form.ts';

export default class EditProfileForm extends Form {
  static componentName = 'EditProfileForm';

  protected template = `
    <form class="edit-profile-form">
        <input type="file" name="avatar" aria-label="Аватар" accept="image/*">
        {{{ Input 
            id="email" 
            name="email" 
            type="email" 
            label="Почта"
            validation-regex=(validationRegex "email") 
            validation-error-text=(validationError "email")  }}}
            
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
            id="first_name" 
            name="first_name" 
            validation-regex=(validationRegex "name")
            validation-error-text=(validationError "name")
            type="text" 
            label="Имя" }}}
                
        {{{ Input 
            id="second_name" 
            name="second_name" 
            validation-regex=(validationRegex "name")
            validation-error-text=(validationError "name")
            type="text" 
            label="Фамилия" }}}
        
        {{{ Input 
            id="display_name" 
            name="display_name" 
            validation-regex=(validationRegex "name")
            validation-error-text=(validationError "name")
            type="text" 
            label="Имя в чате" }}}
            
        {{{ Input 
            id="phone" 
            name="phone" 
            type="tel" 
            label="Телефон"
            validation-regex=(validationRegex "phone")
            validation-error-text=(validationError "phone") }}}
            
        {{{ Button text="Сохранить" type="submit" }}}
    </form>
  `;
}
