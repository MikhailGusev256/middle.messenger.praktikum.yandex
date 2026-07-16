import type { ChatPreviewData } from '../../../services/chat/chat-preview-data.ts';
import { connect } from '../../core/connect.ts';
import './chats.scss';
import Chats from './chats.ts';

export default connect(Chats, (state) => ({
  chats: state['chats'] as ChatPreviewData[],
}));
