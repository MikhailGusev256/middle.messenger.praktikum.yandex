import Block from '../../core/block.ts';

export default class Register extends Block {
  protected template = `
  <main class="auth-page">
    {{{ RegisterCard }}}
  </main>
  `;

  static componentName = 'Register';
}
