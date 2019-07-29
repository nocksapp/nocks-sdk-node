/**
 * Note: tradeMarket.quote is a public resource and therefore the context doesn't need a accessToken
 */
const context = require('../context');

return context.tradeMarket.quote({ code: 'NLG-EUR', side: 'buy', amount: 100, amountType: 'cost' })
  .then((quote) => {
    console.log(quote);
  });
