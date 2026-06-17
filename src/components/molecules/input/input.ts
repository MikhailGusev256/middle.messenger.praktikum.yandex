import Block from '../../core/block.ts';

export default class Input extends Block {
  protected template = `
  <div class="input">
    <label class="input__label" for="{{id}}">{{label}}</label>
    <input class="input__field" id="{{id}}" type="{{type}}" name="{{name}}"/>
  </div>
  `;

  static componentName = 'Input';
}
