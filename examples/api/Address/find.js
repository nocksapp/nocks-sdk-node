const context = require('../context');

return context.address.find({ page: 1 })
  .then(({ pagination, data }) => {
    console.log(pagination);
    console.log(data);

    /**
     * For the additional properties for address check ./findOne
     */
  });
