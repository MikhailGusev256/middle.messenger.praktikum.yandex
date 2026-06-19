export interface ChatPreviewData {
  id: number;
  name: string;
  message: string;
  time: string;
  dateTime: string;
  count?: number;
  src?: string;
}

export interface ChatMessage {
  text: string;
  out: boolean;
  time: string;
}

const chats: ChatPreviewData[] = [
  {
    id: 1,
    name: 'Андрей',
    message: 'Изображение',
    time: '10:49',
    dateTime: '2020-06-01T10:49',
  },
  {
    id: 2,
    name: 'Киноклуб',
    message: 'стикер',
    time: '12:00',
    dateTime: '2020-06-01T12:00',
    count: 2,
  },
  {
    id: 3,
    name: 'Илья',
    message: 'Друзья, у меня для вас особенный выпуск новостей!',
    time: '15:12',
    dateTime: '2020-06-01T15:12',
    count: 4,
  },
  {
    id: 4,
    name: 'Вадим',
    message: 'Круто!',
    time: '10:49',
    dateTime: '2020-06-01T10:49',
  },
  {
    id: 5,
    name: 'тет-а-теты',
    message: 'И Human Interface Guidelines и Material Design рекомендуют...',
    time: '14:01',
    dateTime: '2020-06-01T14:01',
  },
  {
    id: 6,
    name: '1, 2, 3',
    message: 'Миллионы россиян ежедневно проводят десятки часов свое...',
    time: 'Ср',
    dateTime: '2020-05-27',
  },
  {
    id: 7,
    name: 'Design Destroyer',
    message: 'В 2008 году художник Jon Rafman начал собирать...',
    time: 'Пн',
    dateTime: '2020-05-25',
  },
  {
    id: 8,
    name: 'Day.',
    message: 'Так увлекся работой по курсу, что совсем забыл его анонсир...',
    time: '1 Мая 2020',
    dateTime: '2020-05-01',
  },
  {
    id: 9,
    name: 'Стас Рогозин',
    message: 'Можно или сегодня или завтра вечером.',
    time: '12 Апр 2020',
    dateTime: '2020-04-12',
  },
];

const chatMessages: ChatMessage[] = [
  {
    text: 'Привет! Смотри, тут всё работает. Помнишь, я делал?',
    out: false,
    time: '11:56',
  },
  {
    text: 'Привет! Да, отличная работа, спасибо!',
    out: true,
    time: '11:58',
  },
  {
    text: 'Круто 🤔 Я только начал делать, но виден прогресс. Заходи проверить как-нибудь.',
    out: false,
    time: '12:00',
  },
  {
    text: 'Договорились, загляну на выходных.',
    out: true,
    time: '12:01',
  },
  {
    text: 'И Human Interface Guidelines, и Material Design рекомендуют визуально отделять сообщения собеседника от своих.',
    out: false,
    time: '12:05',
  },
  {
    text: 'Согласен, так читать гораздо удобнее.',
    out: true,
    time: '12:06',
  },
];

export default { chats, chatMessages };
