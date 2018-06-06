const scope = require('../scope');

return scope.bill.find({ page: 1 })
  .then(({ pagination, data }) => {
    console.log(pagination);
    console.log(data);

    /**
     * For the additional properties for bill check ./findOne
     */
  });
