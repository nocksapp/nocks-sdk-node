const scope = require('../scope');

const expireAt = new Date();
expireAt.setDate(expireAt.getDate() + 1);

return scope.tradeOrder.create({
  'trade-market': 'NLG-EUR',
  amount: 100,
  side: 'sell',
  rate: 1,
  post_only: true,
  time_in_force: 'gtd',
  expire_at: expireAt,
})
  .then((tradeOrder) => {
    console.log(tradeOrder);

    /**
     * For the additional properties for tradeOrder check ./findOne
     */
  });
