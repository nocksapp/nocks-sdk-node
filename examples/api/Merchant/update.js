const scope = require('../scope');

return scope.merchant.update({ uuid: 'c2f04749-2088-4419-9b92-c0aab80287f2' }, {
  address: 'Dorpstraat',
})
  .then((merchant) => {
    console.log(merchant);
    console.log(merchant.address);

    /**
     * For the additional properties for merchant check ./findOne
     */
  });
