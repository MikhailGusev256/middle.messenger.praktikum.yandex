import Block, { type BlockOwnProps } from '../../core/block.ts';

interface FormErrorProps extends BlockOwnProps {
  error: string;
}

export default class Error extends Block<FormErrorProps> {
  static componentName = 'Error';

  protected template = `
    <span class="error-text{{#if error}} error-text--visible{{/if}}">
        {{error}}
    </span>
  `;
}
