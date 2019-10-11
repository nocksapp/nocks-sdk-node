const context = require('../context');

return context.user.verifyTwoFactorCode({ twoFactorCode: '123456' })
  .then((isValid) => {
    console.log(isValid);
  });
