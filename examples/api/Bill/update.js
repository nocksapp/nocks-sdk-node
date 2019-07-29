const context = require('../context');

return context.bill.update({ uuid: '8e7acf1a-2f76-47ff-8c9d-d1b5b2e5de3f' }, {
  amount: {
    currency: 'EUR',
    value: 30,
  }
})
  .then((bill) => {
    console.log(bill);
    console.log(bill.amount.value);

    /**
     * For the additional properties for bill check ./findOne
     */
  });
