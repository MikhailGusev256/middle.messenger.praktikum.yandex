import Block from '../../core/block.ts';

export default class Login extends Block {
  protected template = `
  <main class="auth-page">
    {{{ LoginCard }}}
  </main>
  `;

  static componentName = 'Login';
}
