const context = require('../context');

return context.setting.get()
  .then((settings) => {
    console.log(settings.currencies);
    console.log(settings.payment_methods);
  });
