import Handlebars from 'handlebars';
Handlebars.registerHelper('firstLetter', (value: string) => {
  if (!value) {
    return '';
  }
  return value[0].toUpperCase();
});
