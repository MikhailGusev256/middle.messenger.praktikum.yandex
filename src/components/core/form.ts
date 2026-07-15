import logger from '../../services/log/console-logger.ts';
import { HttpError } from '../../utils/http-error.ts';
import Input from '../molecules/input/input.ts';
import Block, { type BlockOwnProps } from './block.ts';

export interface FormProps extends BlockOwnProps {
  onDone?: () => void;
  error: string;
}

export default abstract class Form extends Block<FormProps> {
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

      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const obj = Object.fromEntries(data);
      try {
        await this.onValidSubmit(obj);
        this.clearError();
      } catch (e) {
        if (e instanceof HttpError) {
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
    this.setProps({ error: error });
  }

  protected clearError() {
    this.setProps({ error: '' });
  }
}
