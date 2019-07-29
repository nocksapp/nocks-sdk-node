/**
 * Note: tradeMarket.book is a public resource and therefore the context doesn't need a accessToken
 */
const context = require('../context');

return context.tradeMarket.book({ code: 'NLG-EUR' })
  .then((book) => {
    console.log(book);
  });
