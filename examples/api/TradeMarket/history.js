/**
 * Note: tradeMarket.history is a public resource and therefore the context doesn't need a accessToken
 */
const context = require('../context');

return context.tradeMarket.history({ code: 'NLG-EUR' })
  .then((history) => {
    console.log(history);
  });
