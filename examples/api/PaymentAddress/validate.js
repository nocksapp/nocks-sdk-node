const scope = require('../scope');

return scope.paymentAddress.validate({ currency: 'NLG', address: 'TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM' })
  .then((isValid) => {
    console.log(isValid);
  });
