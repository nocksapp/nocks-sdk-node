const scope = require('../scope');

return scope.address.update({ uuid: '7fa207d1-736c-469e-b9c2-6e8bc86481e1' }, {
  name: 'Nocks office'
})
  .then((address) => {
    console.log(address);

    /**
     * For the additional properties for address check ./findOne
     */
  });
