import Block, { type BlockOwnProps } from '../../core/block.ts';
import isProfileMode, { type ProfileModes } from './view-modes.ts';

interface ProfileProps extends BlockOwnProps {
  targetMode: ProfileModes;
}

export default class Profile extends Block<ProfileProps> {
  public static componentName = 'Profile';

  protected events = {
    click: (e: Event) => {
      const modeElement = (e.target as HTMLElement).closest<HTMLElement>(
        '[data-page-mode]',
      );
      if (!modeElement) {
        return;
      }
      const targetMode = modeElement.dataset.pageMode;
      if (isProfileMode(targetMode)) {
        this.setProps({ targetMode });
      }
    },
  };

  protected template = `
  <div class="profile-page">
    {{{ GoBackPanel }}}
    <main class="profile">
        
        <div class="profile__data-and-link-separator">
          {{#ifEquals targetMode "edit-password"}}
            {{{ EditPasswordForm }}}
          {{/ifEquals}}
          
          {{#ifEquals targetMode "edit-profile"}}
            {{{ EditProfileForm }}}
          {{/ifEquals}}
          
          {{#ifEquals targetMode "view"}}
            <div class="profile__header">
                {{{ Avatar name="Иван"}}}
                <h1 class="hl">Иван</h1>
            </div>
            <div class="profile__link-wrapper">
              {{{ Link data-page-mode="edit-profile" text="Изменить данные" }}}
              {{{ Link data-page-mode="edit-password" text="Изменить пароль" }}}
              {{{ Link data-page="login" text="Выйти" danger=true }}}
            </div>
          {{/ifEquals}}
          
        </div>
    </main>
  </div>
  `;

  constructor() {
    super();
    this.props.targetMode = 'view';
  }
}
