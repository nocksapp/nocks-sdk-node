const scope = require('../scope');

return scope.withdrawal.create({
  currency: 'NLG',
  amount: 100.00,
  address: 'TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM',
})
  .then((withdrawal) => {
    console.log(withdrawal);

    /**
     * For the additional properties for withdrawal check ./findOne
     */
  });
