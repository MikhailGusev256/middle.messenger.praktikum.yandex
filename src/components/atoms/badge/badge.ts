import Block from '../../core/block.ts';

export default class Badge extends Block {
  protected template = `
  <span class="badge">{{text}}</span>
  `;

  static componentName = 'Badge';
}
