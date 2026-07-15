import Block, { type BlockOwnProps } from '../../core/block.ts';

interface FormErrorProps extends BlockOwnProps {
  error: string;
}

export default class FormError extends Block<FormErrorProps> {
  static componentName = 'FormError';

  protected template = `
    <span class="form-error-text{{#if error}} form-error-text--visible{{/if}}">
        {{error}}
    </span>
  `;
}
