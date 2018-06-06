const scope = require('../scope');

return scope.bill.create({
  type: 'receive',
  name: 'John Do',
  frequence: 'now',
  merchant_profile: '1234',
  description: 'Description',
  amount: {
    value: 10,
    currency: 'NLG'
  },
  recipient_address_type: 'manual',
})
  .then((bill) => {
    console.log(bill);

    /**
     * For the additional properties for bill check ./findOne
     */
  });
