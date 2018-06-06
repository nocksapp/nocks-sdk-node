/**
 * Note: tradeMarket.find is a public resource and therefore the scope doesn't need a accessToken
 */
const scope = require('../scope');

return scope.tradeMarket.find({ page: 1 })
  .then(({ pagination, data }) => {
    console.log(pagination);
    console.log(data);
  });
