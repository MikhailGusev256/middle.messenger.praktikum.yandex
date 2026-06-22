import Block from '../../core/block.ts';

export default class ChatPreviewList extends Block {
  static componentName = 'ChatPreviewList';

  protected template = `
  <aside class="chat-preview-list">
    <header class="chat-preview-list__header">
        {{{ Link text="Профиль >" data-page="profile" }}}
        <input aria-label="Поиск" id="search-chat" class="chat-preview-list__search" type="search" name="search" placeholder="Поиск" autocomplete="off"/>
    </header>
    <ul class="chat-preview-list__content" role="list">
        {{#each chats}}
            <li>
                {{{ ChatPreview name=name message=message time=time count=count src=src dateTime=dateTime }}}
            </li>
        {{/each}}
    </ul>
  </aside>
  `;
}
