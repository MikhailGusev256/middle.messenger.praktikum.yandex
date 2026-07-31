import type { ChatPreviewData } from '../../../services/chat/chat-preview-data.ts';
import chatService from '../../../services/chat/chat-service.ts';
import errorService from '../../../services/error/error-service.ts';
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
    <ul class="chat-preview-list" role="list">
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
  `;

  protected events: EventListType = {
    click: async (e) => {
      const button = (e.target as HTMLElement).closest('[data-id]');
      if (!button) {
        return;
      }
      const id = Number((button as HTMLElement).dataset.id as string);
      try {
        await chatService.selectChat(id);
      } catch (error) {
        errorService.reportUnexpected(error);
      }
    },
  };
}
