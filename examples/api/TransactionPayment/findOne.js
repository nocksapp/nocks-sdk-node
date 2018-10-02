const scope = require('../scope');

return scope.transactionPayment.findOne({ uuid: '88c9d253-f14b-42de-9d54-64b960d92135' })
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
