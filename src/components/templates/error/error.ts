import Block, { type BlockOwnProps } from '../../core/block.ts';

interface ErrorProps extends BlockOwnProps {
  code: number;
  message: string;
}

export class Error extends Block<ErrorProps> {
  static componentName = 'Error';

  protected template = `
  <main class="error-page">
    <h1 class="error-page__code">{{code}}</h1>
    <p class="error-page__message">{{message}}</p>
    {{{ Link text="Назад к чатам" page="chats" }}}
  </main>
  `;
}

export class Error404 extends Error {
  constructor() {
    super({ code: 404, message: 'Не туда попали' });
  }
}

export class Error500 extends Error {
  constructor() {
    super({ code: 500, message: 'Мы уже фиксим' });
  }
}
