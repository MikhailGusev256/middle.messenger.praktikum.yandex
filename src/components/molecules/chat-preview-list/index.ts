import type { ChatPreviewData } from '../../../services/chat/chat-preview-data.ts';
import { connect } from '../../core/connect.ts';
import { registerComponent } from '../../core/registerComponent.ts';
import './chat-preview-list.scss';
import ChatPreviewList from './chat-preview-list.ts';

const connected = connect(ChatPreviewList, function (state) {
  const chats = state['chats'] as ChatPreviewData[];
  return { chats: chats };
});

registerComponent(connected);
