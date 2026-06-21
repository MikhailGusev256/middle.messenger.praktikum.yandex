interface ValidationPair {
  regex: string;
  error: string;
}

const validationPairs = {
  login: {
    regex: '^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$',
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
    regex: '^(?=.{10,15}$)\\+?\\d+$',
    error: '10–15 символов, цифры, может начинаться с плюса',
  },
  notEmpty: {
    regex: '.+',
    error: 'Поле не должно быть пустым',
  },
} satisfies Record<string, ValidationPair>;

export type ValidationKey = keyof typeof validationPairs;

export default function validate(
  validationRule: ValidationKey,
  value: string,
): { isValid: boolean; errorMessage: string } {
  if (!isValidName(validationRule)) {
    console.log('Передано некорректное правило валидации');
    return { isValid: true, errorMessage: '' };
  }
  const validationPair = validationPairs[validationRule];
  const regExp = new RegExp(validationPair.regex);
  const passes = regExp.test(value);
  return { isValid: passes, errorMessage: passes ? '' : validationPair.error };
}

function isValidName(value: string | undefined): value is ValidationKey {
  return value !== undefined && value in validationPairs;
}
