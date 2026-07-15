import userService from '../../../services/user/user-service.ts';
import type { User } from '../../../services/user/user.ts';
import Block, { type BlockOwnProps } from '../../core/block.ts';
import { type ProfileModes } from './view-modes.ts';

interface ProfileProps extends BlockOwnProps {
  targetMode: ProfileModes;
  changeToViewMode: () => void;
  changeToEditProfileMode: () => void;
  changeToEditPasswordMode: () => void;
  logout: () => void;
  user?: User;
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
                {{{ EditableAvatar src=user.avatar name=user.display_name}}}
                <h1 class="hl">{{user.display_name}}</h1>
            </div>
            <div class="profile__link-wrapper">
              {{{ Button onClick=changeToEditProfileMode text="Изменить данные" isLinkView=true }}}
              {{{ Button onClick=changeToEditPasswordMode text="Изменить пароль" isLinkView=true }}}
              {{{ Button onClick=logout text="Выйти" isLinkView=true isDangerAction=true }}}
            </div>
          {{/ifEquals}}

        </div>
    </main>
  </div>
  `;

  constructor(args: ProfileProps = {} as ProfileProps) {
    super(args);
    this.props.targetMode = 'view';
    this.props.changeToViewMode = () => this.setMode('view');
    this.props.changeToEditProfileMode = () => this.setMode('edit-profile');
    this.props.changeToEditPasswordMode = () => this.setMode('edit-password');
    this.props.logout = () => userService.logout();
  }

  private setMode(mode: ProfileModes): void {
    this.setProps({ targetMode: mode });
  }
}
