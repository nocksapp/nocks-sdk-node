const context = require('../context');

return context.raw.request({
  method: 'GET',
  url: '/trade-market',
})
  .then((response) => {
    console.log(response)
  });
