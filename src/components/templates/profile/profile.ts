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
          <form class="profile__form">
              <input type="file" name="avatar" aria-label="Аватар" accept="image/*">
              {{{ Input id="first_name" name="first_name" type="text" label="Имя" }}}
              {{{ Input id="second_name" name="second_name" type="text" label="Фамилия" }}}
              {{{ Input id="display_name" name="display_name" type="text" label="Имя в чате" }}}
              {{{ Input id="login" name="login" type="text" label="Логин" }}}
              {{{ Input id="email" name="email" type="email" label="Почта" }}}
              {{{ Input id="phone" name="phone" type="tel" label="Телефон" }}}
              {{{ Input id="old_password" name="old_password" type="password" label="Старый пароль" }}}
              {{{ Input id="new_password" name="new_password" type="password" label="Новый пароль" }}}
              {{{ Button text="Сохранить" type="submit" }}}
          </form>
          
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
