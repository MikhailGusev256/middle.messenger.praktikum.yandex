import validate, { type ValidationKey } from '../../../utils/validation.ts';
import Block, { type BlockOwnProps } from '../../core/block.ts';

interface InputProps extends BlockOwnProps {
  validationRule?: ValidationKey;
}

export default class Input extends Block<InputProps> {
  static componentName = 'Input';
  static validationErrorClass = 'validation-error-text--visible';

  public isValid = (): boolean => {
    const validationRule = this.props.validationRule;
    if (!validationRule) {
      return true;
    }
    const input = this.refs.input as HTMLInputElement;
    const { isValid, errorMessage } = validate(validationRule, input.value);

    if (isValid) {
      this.clearError();
    } else {
      this.setError(errorMessage);
    }
    return isValid;
  };

  public clearError() {
    const validationDisplay = this.refs.validation;
    validationDisplay.textContent = '';
    validationDisplay.classList.remove(Input.validationErrorClass);
  }

  public setError(errorMessage: string) {
    const validationDisplay = this.refs.validation;
    validationDisplay.classList.add(Input.validationErrorClass);
    validationDisplay.textContent = errorMessage;
  }

  protected template = `
  <div class="input">
    {{#if label}}
        <label class="input__label" for="{{id}}">{{label}}</label>
    {{/if}}
    <input
      class="input__field"
      id="{{id}}"
      type="{{type}}"
      name="{{name}}"
      ref="input"
      aria-label="{{aria-label}}"
      placeholder="{{placeholder}}"
      autocomplete="{{autocomplete}}"/>
    <span class="validation-error-text" ref="validation"></span>
  </div>
  `;

  protected componentDidMount() {
    super.componentDidMount();
    this.refs.input.addEventListener('blur', this.isValid);
  }

  protected componentWillUnmount() {
    super.componentWillUnmount();
    this.refs.input.removeEventListener('blur', this.isValid);
  }
}
