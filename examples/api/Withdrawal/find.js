const scope = require('../scope');

return scope.withdrawal.find({ page: 1 })
  .then(({ pagination, data }) => {
    console.log(pagination);
    console.log(data);

    /**
     * For the additional properties for withdrawal check ./findOne
     */
  });
