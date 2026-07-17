import Block, {
  type BlockOwnProps,
  type EventListType,
} from '../../core/block.ts';

interface ChatHeaderProps extends BlockOwnProps {
  id: number;
  src: string;
  name: string;
  isMenuOpen: boolean;
  formMode: 'add' | 'remove' | null;
  closeForm: () => void;
}

export default class ChatHeader extends Block<ChatHeaderProps> {
  static componentName = 'ChatHeader';

  constructor(args: ChatHeaderProps = {} as ChatHeaderProps) {
    super(args);
    this.props.closeForm = () => this.setProps({ formMode: null });
  }

  protected template = `
  <div class="chat-header">
    {{{ Avatar src=src name=name }}}
    <strong class="chat-header__name">{{name}}</strong>

    <button
      type="button"
      class="chat-header__menu-button"
      data-role="menu-toggle"
      aria-label="Действия с чатом">⋮</button>

    {{#if isMenuOpen}}
      <div class="chat-header__menu" role="menu">
        <button type="button" class="chat-header__menu-item" data-role="menu-add" role="menuitem">Добавить пользователя</button>
        <button type="button" class="chat-header__menu-item" data-role="menu-remove" role="menuitem">Удалить пользователя</button>
      </div>
    {{/if}}

    {{#ifEquals formMode "add"}}
    {{{ AddUserForm chatId=id onDone=closeForm}}}
    {{/ifEquals}}

    {{#ifEquals formMode "remove"}}
    {{{ RemoveUserForm chatId=id onDone=closeForm}}}
    {{/ifEquals}}
  </div>
  `;

  protected events: EventListType = {
    click: (e) => {
      const target = e.target as HTMLElement;
      const openToggleButton = target.closest('[data-role="menu-toggle"]');
      if (openToggleButton) {
        this.setProps({ isMenuOpen: !this.props.isMenuOpen });
        return;
      }
      const addButton = target.closest('[data-role="menu-add"]');
      if (addButton) {
        this.setProps({ isMenuOpen: false, formMode: 'add' });
        return;
      }
      const removeButton = target.closest('[data-role="menu-remove"]');
      if (removeButton) {
        this.setProps({ isMenuOpen: false, formMode: 'remove' });
        return;
      }
    },
  };
}
