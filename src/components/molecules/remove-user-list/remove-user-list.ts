import chatService from '../../../services/chat/chat-service.ts';
import type { ChatUser } from '../../../services/chat/chat-user.ts';
import { ApiError } from '../../../utils/errors.ts';
import Block, { type EventListType } from '../../core/block.ts';
import type { PropsWithError } from '../../core/props-with-error.ts';

interface RemoveUserListProps extends PropsWithError {
  chatId: number;
  chatUsers?: ChatUser[];
  onDone?: () => void;
}

export default class RemoveUserList extends Block<RemoveUserListProps> {
  static componentName = 'RemoveUserForm';

  protected template = `
  <div>
    <ul class="remove-user-list" role="list">
      {{#each chatUsers}}
        <li class="remove-user-list__item">
          {{{ Avatar name=display_name src=avatar }}}
          <span class="remove-user-list__name">{{display_name}}</span>
          <span class="remove-user-list__role">{{role}}</span>
          <button
            type="button"
            class="remove-user-list__remove"
            data-id="{{id}}"
            aria-label="Удалить участника">×</button>
        </li>
      {{/each}}
    </ul>
    {{{ Error error=error }}}
  </div>
  `;

  protected events: EventListType = {
    click: async (e) => {
      this.clearError();
      const button = (e.target as HTMLElement).closest('[data-id]');
      if (!button) {
        return;
      }
      const id = Number((button as HTMLElement).dataset.id as string);
      try {
        await chatService.removeUsers([id], this.props.chatId);
      } catch (e) {
        if (e instanceof ApiError) {
          this.showError(e.message);
        } else {
          this.showError('Произошла неизвестная ошибка');
        }
      }
    },
  };

  protected showError(error: string) {
    this.setProps({ error: error });
  }

  protected clearError() {
    this.setProps({ error: '' });
  }
}
