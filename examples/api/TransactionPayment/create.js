const context = require('../context');

const transaction = { uuid: '1fa1ff60-4280-4f34-b0eb-2a0671b44b2e' };

return context.transactionPayment.create(transaction, {
  amount: {
    value: 20,
    currency: 'NLG',
  },
  payment_method: {
    method: 'gulden',
  }
})
  .then((payment) => {
    console.log(payment);

    /**
     * For the additional properties for payment check ./findOne
     */
  });
