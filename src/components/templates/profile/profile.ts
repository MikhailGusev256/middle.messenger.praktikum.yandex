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
        '[data-profile-mode]',
      );
      if (!modeElement) {
        return;
      }
      const targetMode = modeElement.dataset.profileMode;
      if (isProfileMode(targetMode)) {
        this.setProps({ targetMode });
      }
    },

    submit: (e: Event) => {
      e.preventDefault();
      if (!(e.target instanceof HTMLFormElement)) {
        return;
      }
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const obj = Object.fromEntries(data);
      console.log(obj);
    },
  };

  protected template = `
  <div class="profile-page">
    {{{ GoBackPanel }}}
    <main class="profile">
        <div class="profile__header">
            {{{ Avatar name="Иван"}}}
            <h1 class="hl">Иван</h1>
        </div>
        <div class="profile__data-and-link-separator">
          {{{ EditPasswordForm }}}
          {{{ EditProfileForm }}}
          
          <div class="profile__link-wrapper">
            {{{ Link data-profile-mode="login" text="Изменить данные" }}}
            {{{ Link data-profile-mode="login" text="Изменить пароль" }}}
            {{{ Link data-page="login" text="Выйти" danger=true }}}
          </div>
        </div>
    </main>
  </div>
  `;
}
