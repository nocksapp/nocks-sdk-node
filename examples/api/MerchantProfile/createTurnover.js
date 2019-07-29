const context = require('../context');

const merchant = { uuid: 'c2f04749-2088-4419-9b92-c0aab80287f2' };

const startDate = new Date('2016-01-01');
const endDate = new Date();


return context.merchantProfile.createTurnover(merchant, { uuid: 'f53593f0-05ff-41f8-bb04-39a079dd3872' }, {
  start: startDate,
  end: endDate,
})
  .then((report) => {
    console.log(report);
  });
