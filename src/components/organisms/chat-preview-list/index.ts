import Handlebars from 'handlebars';

import chatPreviewList from './chat-preview-list.hbs?raw';
import './chat-preview-list.scss';

Handlebars.registerPartial('ChatPreviewList', chatPreviewList);
