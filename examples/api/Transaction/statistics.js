const context = require('../context');

return context.transaction.statistics()
  .then((statistics) => {
    console.log(statistics);
  });
