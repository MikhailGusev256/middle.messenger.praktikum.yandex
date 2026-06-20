import Block from '../../core/block.ts';

export default class Input extends Block {
  static componentName = 'Input';

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

  private validate = (e: Event) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const input = e.target as HTMLInputElement;
    const validationRegex = input.dataset.validationRegex;
    if (!validationRegex) {
      return;
    }
    const regExp = new RegExp(validationRegex);
    const passes = regExp.test(input.value);
    const validationErrorClass = 'validation-error-text--visible';
    if (passes) {
      this.refs.validation.classList.remove(validationErrorClass);
    } else {
      this.refs.validation.classList.add(validationErrorClass);
    }
  };

  protected componentDidMount() {
    super.componentDidMount();
    this.refs.input.addEventListener('blur', this.validate);
  }

  protected componentWillUnmount() {
    super.componentWillUnmount();
    this.refs.input.removeEventListener('blur', this.validate);
  }
}
