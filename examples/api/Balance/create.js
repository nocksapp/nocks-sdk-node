const scope = require('../scope');

return scope.balance.create({
  type: 'trade-cash',
  currency: 'EUR',
})
  .then((balance) => {
    console.log(balance);

    /**
     * For the additional properties for balance check ./findOne
     */
  });
