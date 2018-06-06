/**
 * Note: tradeMarket.distribution is a public resource and therefore the scope doesn't need a accessToken
 */
const scope = require('../scope');

return scope.tradeMarket.distribution({ code: 'NLG-EUR', positions: 20 })
  .then((distribution) => {
    console.log(distribution);
  });
