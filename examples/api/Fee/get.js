const context = require('../context');

return context.fee.get()
  .then(({ pagination, data }) => {
    console.log(pagination);
    console.log(data);
  });
