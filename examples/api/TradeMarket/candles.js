/**
 * Note: tradeMarket.candles is a public resource and therefore the context doesn't need a accessToken
 */
const context = require('../context');

return context.tradeMarket.candles({ code: 'NLG-EUR', start: 1525132800, end: 1528208419, interval: 3600 })
  .then((candles) => {
    console.log(candles);
  });
