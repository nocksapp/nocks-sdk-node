/**
 * Note: tradeMarket.find is a public resource and therefore the context doesn't need a accessToken
 */
const context = require('../context');

return context.tradeMarket.find({ page: 1 })
  .then(({ pagination, data }) => {
    console.log(pagination);
    console.log(data);
  });
