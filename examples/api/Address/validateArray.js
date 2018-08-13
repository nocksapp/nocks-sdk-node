const scope = require('../scope');

return scope.address.validateArray([
  { currency: 'NLG', address: 'TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM' },
  { currency: 'EUR', address: 'NL16ABNA0602167736' },
])
  .then((result) => {
    console.log(result['TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM']);
    console.log(result['NL16ABNA0602167736']);
  });
