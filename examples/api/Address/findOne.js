const scope = require('../scope');

return scope.address.findOne({ uuid: '7fa207d1-736c-469e-b9c2-6e8bc86481e1' })
  .then((address) => {
    console.log(address);
    console.log(address.created_at.getTime());
  });
