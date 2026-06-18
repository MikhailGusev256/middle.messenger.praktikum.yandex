import Block from '../../core/block.ts';

export default class Profile extends Block {
  public static componentName = 'Profile';

  protected template = `
  <div class="profile-page">
    {{{ GoBackPanel }}}
    <main class="profile">
        <div class="profile__header">
            {{{ Avatar name="Иван"}}}
            <h1 class="hl">Иван</h1>
        </div>
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
        {{{ Link data-page="login" text="Выйти" danger=true }}}
    </main>
  </div>
  `;
}
