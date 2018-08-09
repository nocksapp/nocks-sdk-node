/**
 * Note: tradeMarket.quote is a public resource and therefore the scope doesn't need a accessToken
 */
const scope = require('../scope');

return scope.tradeMarket.quote({ code: 'NLG-EUR', side: 'buy', amount: 100, amountType: 'cost' })
  .then((quote) => {
    console.log(quote);
  });
