const scope = require('../scope');

const merchant = { uuid: 'c2f04749-2088-4419-9b92-c0aab80287f2' };

return scope.merchantProfile.find(merchant)
  .then(({ pagination, data }) => {
    console.log(pagination);
    console.log(data);

    /**
     * For the additional properties for merchantProfile check ./findOne
     */
  });
