import Block from '../../core/block.ts';

export default class Chats extends Block {
  static componentName = 'Chats';

  protected template = `
  <div class="chats-page">
    {{{ ChatPreviewList chats=chatData.chats }}}
    <main class="chats-page__window">
        <div class="chats-page__history">
        {{#each chatData.chatMessages}}
            {{{ MessageBubble text=text out=out time=time}}}
        {{/each}}
        </div>
        {{{ MessageInput }}}
    </main>
  </div>
  `;
}
