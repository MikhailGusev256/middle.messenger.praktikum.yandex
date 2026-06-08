import Handlebars from 'handlebars';

import messageInput from './message-input.hbs?raw';
import './message-input.scss';

Handlebars.registerPartial('MessageInput', messageInput);
