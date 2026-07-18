import Block, {
  type BlockOwnProps,
  type EventListType,
} from '../../core/block.ts';

export interface ButtonProps extends BlockOwnProps {
  onClick?: () => void;
  isLinkView?: boolean;
  isDangerAction?: boolean;
  type: 'submit' | 'reset' | 'button';
  text: string;
}

export default class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  constructor(args?: ButtonProps) {
    super(args);
    if (!this.props.type) {
      this.props.type = 'button';
    }
  }

  protected template = `
    <button class="button{{#if isLinkView}} button--link{{/if}}{{#if isDangerAction}} button--danger{{/if}}" type="{{type}}">
        {{text}}
    </button>
  `;

  protected events: EventListType = {
    click: (): void => {
      this.props.onClick?.();
    },
  };
}
