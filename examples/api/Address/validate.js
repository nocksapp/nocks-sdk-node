const scope = require('../scope');

return scope.address.validate({ currency: 'NLG', address: 'TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM' })
  .then(({ validation }) => {
    console.log(validation);
  });
