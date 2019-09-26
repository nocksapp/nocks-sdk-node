const context = require('../context');

return context.fee.get({ page: 1 })
  .then(({ pagination, data }) => {
    console.log(pagination);
    console.log(data);
  });
