/**
 * Note: tradeMarket.candles is a public resource and therefore the scope doesn't need a accessToken
 */
const scope = require('../scope');

return scope.tradeMarket.candles({ code: 'NLG-EUR', start: 1525132800, end: 1528208419, interval: 3600 })
  .then((candles) => {
    console.log(candles);
  });
