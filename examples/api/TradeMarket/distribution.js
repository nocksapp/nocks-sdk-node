/**
 * Note: tradeMarket.distribution is a public resource and therefore the context doesn't need a accessToken
 */
const context = require('../context');

return context.tradeMarket.distribution({ code: 'NLG-EUR', positions: 20 })
  .then((distribution) => {
    console.log(distribution);
  });
