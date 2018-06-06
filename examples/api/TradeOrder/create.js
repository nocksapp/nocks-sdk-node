const scope = require('../scope');

return scope.tradeOrder.create({
  'trade-market': 'NLG-EUR',
  amount: 100,
  side: 'sell',
  rate: 1
})
  .then((tradeOrder) => {
    console.log(tradeOrder);

    /**
     * For the additional properties for tradeOrder check ./findOne
     */
  });
