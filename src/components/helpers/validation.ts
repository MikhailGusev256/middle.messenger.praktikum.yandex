import Handlebars from 'handlebars';

interface ValidationPair {
  regex: string;
  error: string;
}
type ValidationKey = 'login' | 'password' | 'name' | 'email' | 'phone';

const validationPairs: Record<ValidationKey, ValidationPair> = {
  login: {
    regex: '^(?=.*[a-zA-Z_-])[a-zA-Z0-9_-]{3,20}$',
    error: 'Минимум 3 символа, латиница, без пробелов',
  },
  password: {
    regex: '^(?=.*[A-Z])(?=.*\\d).{8,40}$',
    error: 'Минимум 8 символов, одна заглавная буква и одна цифра',
  },
  name: {
    regex: '^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$',
    error: 'Латиница или кириллица, первая буква заглавная',
  },
  email: {
    regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\\.[a-zA-Z]+$',
    error: 'Email должен быть валидный',
  },
  phone: {
    regex: '^\\+?\\d{10,15}$',
    error: '10–15 цифр',
  },
};

function isValidName(value: string | undefined): value is ValidationKey {
  return value !== undefined && value in validationPairs;
}

Handlebars.registerHelper('validationRegex', (value: string) => {
  if (isValidName(value)) {
    const pair = validationPairs[value];
    return pair.regex;
  }
});

Handlebars.registerHelper('validationError', (value: string) => {
  if (isValidName(value)) {
    const pair = validationPairs[value];
    return pair.error;
  }
});
