import type { ChatUser } from '../../../services/chat/chat-user.ts';
import { connect } from '../../core/connect.ts';
import { registerComponent } from '../../core/registerComponent.ts';
import './remove-user-list.scss';
import RemoveUserList from './remove-user-list.ts';

const connected = connect(RemoveUserList, function (state) {
  const users = state['selectedChatUsers'] as ChatUser[];
  return {
    chatUsers: users,
  };
});

registerComponent(connected);
