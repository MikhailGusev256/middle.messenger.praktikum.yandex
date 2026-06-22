import Block from '../../core/block.ts';

export default class LoginCard extends Block {
  static componentName = 'LoginCard';

  protected template = `
  <div class="login-card">
    <h1 class="hl">Вход</h1>
    {{{ LoginForm }}}
    {{{ Link text="Нет аккаунта?" data-page="register" }}}
    </div>
  `;
}
