/**
 * Note: tradeMarket.book is a public resource and therefore the scope doesn't need a accessToken
 */
const scope = require('../scope');

return scope.tradeMarket.book({ code: 'NLG-EUR' })
  .then((book) => {
    console.log(book);
  });
