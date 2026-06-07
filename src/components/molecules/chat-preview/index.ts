import Handlebars from 'handlebars';
import chatPreview from './chat-preview.hbs?raw';
import './chat-preview.scss';

Handlebars.registerPartial('ChatPreview', chatPreview);
