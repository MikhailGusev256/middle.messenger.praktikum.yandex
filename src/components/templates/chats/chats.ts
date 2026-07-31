import type { ChatPreviewData } from '../../../services/chat/chat-preview-data.ts';
import chatService from '../../../services/chat/chat-service.ts';
import errorService from '../../../services/error/error-service.ts';
import type { ChatMessage } from '../../../services/message/chat-message.ts';
import Block, { type BlockOwnProps } from '../../core/block.ts';

interface ChatsProps extends BlockOwnProps {
  selectedChat?: ChatPreviewData;
  chatMessages: ChatMessage[];
}

export default class Chats extends Block<ChatsProps> {
  static componentName = 'Chats';

  protected template = `
  <div class="chats-page">
    {{{ LeftSidePanel }}}
    <main class="chats-page__window">
        {{#if selectedChat}}
          {{{ ChatHeader id=selectedChat.id name=selectedChat.name src=selectedChat.src }}}
          <div class="chats-page__history">
          {{#each chatMessages}}
              {{{ MessageBubble text=text out=out time=time}}}
          {{/each}}
          </div>
          {{{ MessageInput }}}
        {{/if}}
    </main>
  </div>
  `;

  override async componentDidMount() {
    try {
      await chatService.fetchChats();
    } catch (error) {
      errorService.reportUnexpected(error);
    }
  }
}
