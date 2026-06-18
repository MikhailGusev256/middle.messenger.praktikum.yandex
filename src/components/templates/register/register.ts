import Block from '../../core/block.ts';

export default class Register extends Block {
  static componentName = 'Register';

  protected template = `
  <main class="auth-page">
    {{{ RegisterCard }}}
  </main>
  `;
}
