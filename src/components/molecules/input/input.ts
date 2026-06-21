import validate, { type ValidationKey } from '../../../utils/validation.ts';
import Block, { type BlockOwnProps } from '../../core/block.ts';

interface InputProps extends BlockOwnProps {
  validationRule: ValidationKey;
}

export default class Input extends Block<InputProps> {
  static componentName = 'Input';

  public isValid = (): boolean => {
    const validationRule = this.props.validationRule;
    if (!validationRule) {
      return true;
    }
    const input = this.refs.input as HTMLInputElement;
    const { isValid, errorMessage } = validate(validationRule, input.value);

    const validationErrorClass = 'validation-error-text--visible';
    const validationDisplay = this.refs.validation;
    if (isValid) {
      validationDisplay.textContent = '';
      validationDisplay.classList.remove(validationErrorClass);
    } else {
      validationDisplay.classList.add(validationErrorClass);
      validationDisplay.textContent = errorMessage;
    }
    return isValid;
  };

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
