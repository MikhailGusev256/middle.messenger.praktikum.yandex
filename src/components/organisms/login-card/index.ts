import Handlebars from 'handlebars';

import loginCard from './login-card.hbs?raw';

import './login-card.scss';

Handlebars.registerPartial('LoginCard', loginCard);
