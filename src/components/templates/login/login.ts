import Block from '../../core/block.ts';

export default class Login extends Block {
  static componentName = 'Login';

  protected template = `
  <main class="auth-page">
    {{{ LoginCard }}}
  </main>
  `;
}
