const context = require('../context');

return context.fundingSource.findOne({ uuid: 'b6e924c7-b97f-4256-aa26-741701f58a8d' })
  .then((fundingSource) => {
    console.log(fundingSource);
  });
