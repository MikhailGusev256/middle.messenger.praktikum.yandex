import Block from '../../core/block.ts';

export default class RegisterCard extends Block {
  static componentName = 'RegisterCard';

  protected template = `
  <div class="register-card">
    <h1 class="hl">Регистрация</h1>
    {{{ RegisterForm }}}
    {{{ Link text="Войти" data-page="login" }}}
  </div>
  `;
}
