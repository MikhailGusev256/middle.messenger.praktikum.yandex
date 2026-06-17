import Block from '../../core/block.ts';

export default class ChatPreviewList extends Block {
  protected template = `
  <aside class="chat-preview-list">
    <header class="chat-preview-list__header">
        {{{ Link text="Профиль >" data-page="profile" }}}
        <input aria-label="Поиск" id="search-chat" class="chat-preview-list__search" type="search" name="search" placeholder="Поиск" autocomplete="off"/>
    </header>
    <ul>
        {{#each chats}}
            <li>
                {{{ ChatPreview name=name message=message time=time count=count src=src dateTime=dateTime }}}
            </li>
        {{/each}}
    </ul>
  </aside>
  `;

  static componentName = 'ChatPreviewList';
}
