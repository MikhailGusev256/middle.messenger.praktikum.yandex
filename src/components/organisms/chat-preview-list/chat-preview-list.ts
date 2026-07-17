import chatService from '../../../services/chat/chat-service.ts';
import Block, { type EventListType } from '../../core/block.ts';

export default class ChatPreviewList extends Block {
  static componentName = 'ChatPreviewList';

  protected template = `
  <aside class="chat-preview-list">
    <header class="chat-preview-list__header">
        {{{ Link text="Профиль >" page="profile" }}}
        <input aria-label="Поиск" id="search-chat" class="chat-preview-list__search" type="search" name="search" placeholder="Поиск" autocomplete="off"/>
        {{{ CreateChatForm }}}
    </header>
    <ul class="chat-preview-list__content" role="list">
        {{#each chats}}
            <li>
                {{{ ChatPreview
                    id=id
                    name=name
                    message=message
                    time=time
                    count=count
                    src=src
                    dateTime=dateTime }}}
            </li>
        {{/each}}
    </ul>
  </aside>
  `;

  protected events: EventListType = {
    click: async (e) => {
      const button = (e.target as HTMLElement).closest('[data-id]');
      if (!button) {
        return;
      }
      const id = Number((button as HTMLElement).dataset.id as string);
      await chatService.selectChat(id);
    },
  };
}
