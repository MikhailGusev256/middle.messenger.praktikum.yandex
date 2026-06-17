import Block from '../../core/block.ts';

export default class Chats extends Block {
  protected template = `
  <div class="chats-page">
    {{{ ChatPreviewList chats=chats }}}
    <main class="chats-page__window">
        <div class="chats-page__history"></div>
        {{{ MessageInput }}}
    </main>
  </div>
  `;

  static componentName = 'Chats';
}
