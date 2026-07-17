import type { ChatPreviewData } from '../../../services/chat/chat-preview-data.ts';
import chatService from '../../../services/chat/chat-service.ts';
import Block, {
  type BlockOwnProps,
  type EventListType,
} from '../../core/block.ts';

interface ChatPreviewListProps extends BlockOwnProps {
  chats: ChatPreviewData[];
}

export default class ChatPreviewList extends Block<ChatPreviewListProps> {
  static componentName = 'ChatPreviewList';

  protected template = `
  <aside class="chat-preview-list">
    <header class="chat-preview-list__header">
        {{{ Link text="Профиль >" page="profile" }}}
        {{{ Input aria-label="Поиск"
                  id="search-chat"
                  type="search"
                  name="search"
                  placeholder="Поиск"
                  autocomplete="off"}}}
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

    input: async (e) => {
      const input = e.target as HTMLInputElement;
      if (input.id === 'search-chat') {
        const filter = input.value;
        await chatService.fetchChats(filter);
      }
    },
  };
}
