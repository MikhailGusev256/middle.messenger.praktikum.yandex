import {
  selectChatPreviews,
  selectSelectedChatId,
} from '../../../services/chat/chat-selectors.ts';
import { selectCurrentChatMessages } from '../../../services/message/message-selectors.ts';
import { connect } from '../../core/connect.ts';
import './chats.scss';
import Chats from './chats.ts';

export default connect(Chats, function (state) {
  const chats = selectChatPreviews(state);
  const selectedChatId = selectSelectedChatId(state);
  return {
    selectedChat: chats?.find((c) => c.id === selectedChatId),
    chatMessages: selectCurrentChatMessages(state),
  };
});
