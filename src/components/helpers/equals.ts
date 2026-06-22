import Handlebars from 'handlebars';
Handlebars.registerHelper(
  'ifEquals',
  function (
    this: unknown,
    arg1: string | number,
    arg2: string | number,
    options: Handlebars.HelperOptions,
  ) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  },
);
