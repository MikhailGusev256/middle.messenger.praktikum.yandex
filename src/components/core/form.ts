import Input from '../molecules/input/input.ts';
import Block from './block.ts';

export default abstract class Form extends Block {
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
        this.onValidSubmit(obj);
      }
    },
  };

  protected onValidSubmit(data: Record<string, FormDataEntryValue>): void {
    console.log(data);
  }
}
