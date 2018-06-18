const scope = require('../scope');

return scope.setting.get()
  .then((settings) => {
    console.log(settings.currencies);
    console.log(settings.payment_methods);
  });
