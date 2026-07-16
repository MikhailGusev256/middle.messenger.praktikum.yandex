import { connect } from '../../core/connect.ts';
import './chats.scss';
import Chats from './chats.ts';

export default connect(Chats, (state) => ({
  user: state['user'] as User,
}));
