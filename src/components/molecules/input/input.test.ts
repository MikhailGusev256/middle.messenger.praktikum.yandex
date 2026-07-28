import { beforeEach, describe, expect, it, vi } from 'vitest';
import type validate from '../../../utils/validation.ts';
import Input from './input.ts';

const mocks = vi.hoisted(() => ({ validate: vi.fn<typeof validate>() }));

vi.mock('../../../utils/validation.ts', () => ({
  default: mocks.validate,
}));

describe('Input', () => {
  beforeEach(() => mocks.validate.mockReset());

  it('isValid возвращает true, когда правило валидации пустое', () => {
    const input = new Input();
    const result = input.isValid();
    expect(result).toBe(true);
    expect(mocks.validate).not.toHaveBeenCalled();
  });

  it('isValid передаёт корректное правило валидации в валидатор', () => {
    const input = new Input({ validationRule: 'login' });
    const element = input.element();
    const field = element.querySelector('input') as HTMLInputElement;
    field.value = '123';
    mocks.validate.mockReturnValue({ isValid: true, errorMessage: '' });
    input.isValid();
    expect(mocks.validate).toHaveBeenCalledWith('login', '123');
  });

  it('isValid очищает ошибку при успешной валидации', () => {
    const input = new Input({ validationRule: 'login' });
    const element = input.element();

    const errorSpan = element.querySelector('span') as HTMLSpanElement;
    errorSpan.textContent = 'ошибка';
    errorSpan.classList.add('validation-error-text--visible');

    mocks.validate.mockReturnValue({ isValid: true, errorMessage: '' });
    input.isValid();

    expect(errorSpan.textContent).toBe('');
    expect(errorSpan.classList.contains('validation-error-text--visible')).toBe(
      false,
    );
  });

  it('isValid выставляет ошибку при провале валидации', () => {
    const input = new Input({ validationRule: 'login' });
    const element = input.element();

    const errorSpan = element.querySelector('span') as HTMLSpanElement;
    errorSpan.textContent = '';

    mocks.validate.mockReturnValue({ isValid: false, errorMessage: 'ошибка' });
    input.isValid();

    expect(errorSpan.textContent).toBe('ошибка');
    expect(errorSpan.classList.contains('validation-error-text--visible')).toBe(
      true,
    );
  });
});
