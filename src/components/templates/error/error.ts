import Block from '../../core/block.ts';

export default class Error extends Block {
  protected template = `
  <main class="error-page">
    <h1 class="error-page__code">{{errorCode}}</h1>
    <p class="error-page__message">{{errorMessage}}</p>
    {{{ Link text="Назад к чатам" data-page="chats" }}}
  </main>
  `;

  static componentName = 'Error';
}
