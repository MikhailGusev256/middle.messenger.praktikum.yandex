import chatService from '../../../services/chat/chat-service.ts';
import errorService from '../../../services/error/error-service.ts';
import Block, { type EventListType } from '../../core/block.ts';

export default class LeftSidePanel extends Block {
  static componentName = 'LeftSidePanel';

  protected template = `
  <aside class="left-side-panel">
    <header class="left-side-panel__header">
        {{{ Link text="Профиль >" page="profile" }}}
        {{{ Input aria-label="Поиск"
                  id="search-chat"
                  type="search"
                  name="search"
                  placeholder="Поиск"
                  autocomplete="off"}}}
        {{{ CreateChatForm }}}
    </header>
    {{{ ChatPreviewList }}}
  </aside>
  `;

  protected events: EventListType = {
    input: async (e) => {
      const input = e.target as HTMLInputElement;
      if (input.id === 'search-chat') {
        const filter = input.value;
        try {
          await chatService.fetchChats(filter);
        } catch (error) {
          errorService.reportUnexpected(error);
        }
      }
    },
  };
}
