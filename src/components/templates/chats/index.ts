import type { ChatPreviewData } from '../../../services/chat/chat-preview-data.ts';
import { connect } from '../../core/connect.ts';
import './chats.scss';
import Chats from './chats.ts';

export default connect(Chats, function (state) {
  const chats = state['chats'] as ChatPreviewData[];
  const selectedChatId = state['selectedChatId'] as number;
  return {
    selectedChat: chats?.find((c) => c.id === selectedChatId),
  };
});
