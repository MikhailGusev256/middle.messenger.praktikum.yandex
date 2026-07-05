import Block, { type BlockOwnProps } from '../../core/block.ts';
import { type ProfileModes } from './view-modes.ts';

interface ProfileProps extends BlockOwnProps {
  targetMode: ProfileModes;
  changeToViewMode: () => void;
  changeToEditProfileMode: () => void;
  changeToEditPasswordMode: () => void;
}

export default class Profile extends Block<ProfileProps> {
  public static componentName = 'Profile';

  protected template = `
  <div class="profile-page">
    {{{ GoBackPanel }}}
    <main class="profile">

        <div class="profile__data-and-link-separator">
          {{#ifEquals targetMode "edit-password"}}
            {{{ EditPasswordForm onDone=changeToViewMode }}}
          {{/ifEquals}}

          {{#ifEquals targetMode "edit-profile"}}
            {{{ EditProfileForm onDone=changeToViewMode }}}
          {{/ifEquals}}

          {{#ifEquals targetMode "view"}}
            <div class="profile__header">
                {{{ Avatar name="Иван"}}}
                <h1 class="hl">Иван</h1>
            </div>
            <div class="profile__link-wrapper">
              {{{ Button onClick=changeToEditProfileMode text="Изменить данные" isLinkView=true }}}
              {{{ Button onClick=changeToEditPasswordMode text="Изменить пароль" isLinkView=true }}}
              {{{ Button text="Выйти" isLinkView=true isDangerAction=true }}}
            </div>
          {{/ifEquals}}

        </div>
    </main>
  </div>
  `;

  constructor() {
    super();
    this.props.targetMode = 'view';
    this.props.changeToViewMode = () => this.setMode('view');
    this.props.changeToEditProfileMode = () => this.setMode('edit-profile');
    this.props.changeToEditPasswordMode = () => this.setMode('edit-password');
  }

  private setMode(mode: ProfileModes): void {
    this.setProps({ targetMode: mode });
  }
}
