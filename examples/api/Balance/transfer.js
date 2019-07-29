const context = require('../context');

return context.balance.transfer({
  balance_from: '723b8c0a-d802-4e3f-8347-a53c12ced0b8',
  balance_to: '83123d4c-fb85-4584-b93f-f4b08eeaaaee',
  amount: 10,
})
  .then((data) => {
    console.log(data);
  });
