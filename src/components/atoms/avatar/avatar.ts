import Block, { type BlockOwnProps } from '../../core/block.ts';

export interface AvatarProps extends BlockOwnProps {
  src: string;
  name: string;
}

export default class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar';

  protected template = `
  {{#if src}}
    <img class="avatar" alt="{{name}}" src="{{src}}"/>
  {{else}}
    <div class="avatar avatar--placeholder">{{firstLetter name}}</div>
  {{/if}}
  `;
}
