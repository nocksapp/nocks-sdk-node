const scope = require('../scope');

return scope.transaction.statistics()
  .then((statistics) => {
    console.log(statistics);
  });
