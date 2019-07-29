const context = require('../context');

return context.paymentAddress.validate({ currency: 'NLG', address: 'TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM' })
  .then((isValid) => {
    console.log(isValid);
  })
  .catch((err) => {
    console.log(err);
  });
