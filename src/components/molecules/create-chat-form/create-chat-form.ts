import chatService from '../../../services/chat/chat-service.ts';
import Form from '../../core/form.ts';

export default class CreateChatForm extends Form {
  static componentName = 'CreateChatForm';

  protected template = `
  <form class="create-chat__form">
    {{{ Input name="title" type="text"
              label="Название нового чата"
              aria-label="Название нового чата"}}}
    {{{ Button text="Создать" type="submit" }}}
    {{{ Error error=error }}}
  </form>
  `;

  protected override async onValidSubmit(
    data: Record<string, FormDataEntryValue>,
  ): Promise<void> {
    const title = data['title'].toString();
    await chatService.createChat(title);
  }
}
