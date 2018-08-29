const scope = require('../scope');

const transaction = { uuid: '1fa1ff60-4280-4f34-b0eb-2a0671b44b2e' };

return scope.transactionPayment.create(transaction, {
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
    console.log(payment.amount.value);
    console.log(payment.payment_method);

    console.log(payment.isOpen());
    console.log(payment.isPending());
    console.log(payment.isCancelled());
    console.log(payment.isPaid());
    console.log(payment.isExpired());
    console.log(payment.isRefunded());
  });
