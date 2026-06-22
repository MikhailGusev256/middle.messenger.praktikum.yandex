import Block from '../../core/block.ts';

export default class BackIcon extends Block {
  static componentName = 'BackIcon';

  protected template = `
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="currentColor"/>
    <path d="M13 19L9 14L13 9" stroke="currentColor" stroke-width="1.6"/>
  </svg>
  `;
}
