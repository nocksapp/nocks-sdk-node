/**
 * Note: tradeMarket.history is a public resource and therefore the scope doesn't need a accessToken
 */
const scope = require('../scope');

return scope.tradeMarket.history({ code: 'NLG-EUR' })
  .then((history) => {
    console.log(history);
  });
