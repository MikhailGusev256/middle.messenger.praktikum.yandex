import Block from '../../core/block.ts';

export default class Input extends Block {
  static componentName = 'Input';

  public isValid = (): boolean => {
    const input = this.refs.input as HTMLInputElement;
    const validationRegex = input.dataset.validationRegex;
    if (!validationRegex) {
      return true;
    }
    const regExp = new RegExp(validationRegex);
    const passes = regExp.test(input.value);
    const validationErrorClass = 'validation-error-text--visible';
    if (passes) {
      this.refs.validation.classList.remove(validationErrorClass);
    } else {
      this.refs.validation.classList.add(validationErrorClass);
    }
    return passes;
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
      data-validation-regex="{{validation-regex}}"
      aria-label="{{aria-label}}"
      placeholder="{{placeholder}}"
      autocomplete="{{autocomplete}}"/>
    <span 
        class="validation-error-text" 
        ref="validation">{{validation-error-text}}</span>
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
