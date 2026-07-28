import logger from '../../services/log/console-logger.ts';
import { ApiError } from '../../utils/errors.ts';
import Input from '../molecules/input/input.ts';
import Block from './block.ts';
import type { PropsWithError } from './props-with-error.ts';

export interface FormProps extends PropsWithError {
  onDone?: () => void;
}

export default abstract class Form<
  T extends FormProps = FormProps,
> extends Block<T> {
  protected events = {
    submit: async (e: Event) => {
      e.preventDefault();
      if (!(e.target instanceof HTMLFormElement)) {
        return;
      }

      const inputs = this.children.filter((c) => c instanceof Input);
      const areAllValid = inputs.reduce(
        (allValid, input) => input.isValid() && allValid,
        true,
      );

      if (!areAllValid) {
        this.showError('Не все поля заполнены верно');
        return;
      }

      this.clearError();
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const obj = Object.fromEntries(data);
      try {
        await this.onValidSubmit(obj);
      } catch (e) {
        if (e instanceof ApiError) {
          this.showError(e.message);
        } else {
          this.showError('Произошла неизвестная ошибка');
        }
      }
    },
  };

  protected onValidSubmit(
    data: Record<string, FormDataEntryValue>,
  ): Promise<void> {
    logger.log(data);
    this.props.onDone?.();
    return Promise.resolve();
  }

  protected showError(error: string) {
    this.setProps({ error: error } as Partial<T>);
  }

  protected clearError() {
    this.setProps({ error: '' } as Partial<T>);
  }
}
