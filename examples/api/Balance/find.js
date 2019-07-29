const context = require('../context');

return context.balance.find({ page: 1 })
  .then(({ pagination, data }) => {
    console.log(pagination);
    console.log(data);

    /**
     * For the additional properties for balance check ./findOne
     */
  });
