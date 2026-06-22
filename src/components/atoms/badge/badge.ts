import Block from '../../core/block.ts';

export default class Badge extends Block {
  static componentName = 'Badge';

  protected template = `
  <span class="badge">{{text}}</span>
  `;
}
