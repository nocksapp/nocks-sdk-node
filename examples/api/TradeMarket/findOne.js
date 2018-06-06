/**
 * Note: tradeMarket.findOne is a public resource and therefore the scope doesn't need a accessToken
 */
const scope = require('../scope');

return scope.tradeMarket.findOne({ code: 'NLG-EUR' })
  .then((tradeMarket) => {
    console.log(tradeMarket);
  });
