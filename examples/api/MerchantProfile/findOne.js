const scope = require('../scope');

const merchant = { uuid: 'c2f04749-2088-4419-9b92-c0aab80287f2' };

return scope.merchantProfile.findOne(merchant, { uuid: 'f53593f0-05ff-41f8-bb04-39a079dd3872' })
  .then((merchantProfile) => {
    console.log(merchantProfile);
  });
