import { selectChatUsers } from '../../../services/user/user-selectors.ts';
import { connect } from '../../core/connect.ts';
import { registerComponent } from '../../core/registerComponent.ts';
import './remove-user-list.scss';
import RemoveUserList from './remove-user-list.ts';

const connected = connect(RemoveUserList, function (state) {
  return {
    chatUsers: selectChatUsers(state),
  };
});

registerComponent(connected);
