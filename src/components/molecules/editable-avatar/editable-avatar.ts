import { ApiError } from '../../../utils/errors.ts';
import type { AvatarProps } from '../../atoms/avatar/avatar.ts';
import Block, { type EventListType } from '../../core/block.ts';
import type { PropsWithError } from '../../core/props-with-error.ts';

interface EditableAvatarProps extends AvatarProps, PropsWithError {
  editAction: (file: File) => Promise<void>;
}

export default class EditableAvatar extends Block<EditableAvatarProps> {
  static componentName = 'EditableAvatar';

  protected template = `
  <label class="editable-avatar">
    <input class="editable-avatar__input" type="file" name="avatar" aria-label="Аватар" accept="image/jpeg, image/png, image/gif, image/webp">
    {{{ Avatar src=src name=name }}}
    <span class="editable-avatar__error">{{{ Error error=error }}}</span>
  </label>
  `;

  protected events: EventListType = {
    change: async (e): Promise<void> => {
      if (!(e.target instanceof HTMLInputElement)) {
        return;
      }
      const input = e.target;
      const file = input?.files?.item(0);
      if (!file) {
        return;
      }

      try {
        this.setProps({ error: '' });
        await this.props.editAction(file);
      } catch (e) {
        const error =
          e instanceof ApiError ? e.message : 'Произошла неизвестная ошибка';
        this.setProps({ error: error });
      }
    },
  };
}
