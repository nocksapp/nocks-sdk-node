const scope = require('../scope');

return scope.raw.request({
  method: 'GET',
  url: '/trade-market',
})
  .then((response) => {
    console.log(response)
  });
