import Block from '../../core/block.ts';

export default class LoginCard extends Block {
  static componentName = 'LoginCard';

  protected events = {
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
  <div class="login-card">
    <h1 class="hl">Вход</h1>
    <form class="login-card__form">
        <div>
            {{{ Input id="login" name="login" type="text" label="Логин" }}}
            {{{ Input id="password" name="password" type="password" label="Пароль" }}}
        </div>
        {{{ Button text="Авторизоваться" type="submit" }}}
    </form>
    {{{ Link text="Нет аккаунта?" data-page="register" }}}
    </div>
  `;
}
