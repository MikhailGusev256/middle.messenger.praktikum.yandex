import logger from '../../services/log/console-logger.ts';
import Input from '../molecules/input/input.ts';
import Block, { type BlockOwnProps } from './block.ts';

interface FormProps extends BlockOwnProps {
  onDone?: (e: Event) => void;
}

export default abstract class Form extends Block<FormProps> {
  protected events = {
    submit: (e: Event) => {
      e.preventDefault();
      if (!(e.target instanceof HTMLFormElement)) {
        return;
      }

      const inputs = this.children.filter((c) => c instanceof Input);
      const areAllValid = inputs.reduce(
        (allValid, input) => input.isValid() && allValid,
        true,
      );

      if (areAllValid) {
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        const obj = Object.fromEntries(data);
        this.onValidSubmit(e, obj);
      }
    },
  };

  protected onValidSubmit(
    e: Event,
    data: Record<string, FormDataEntryValue>,
  ): void {
    logger.log(data);
    this.props.onDone?.(e);
  }
}
