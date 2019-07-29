/**
 * Note: tradeMarket.findOne is a public resource and therefore the context doesn't need a accessToken
 */
const context = require('../context');

return context.tradeMarket.findOne({ code: 'NLG-EUR' })
  .then((tradeMarket) => {
    console.log(tradeMarket);
  });
