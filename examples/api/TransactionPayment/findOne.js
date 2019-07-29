const context = require('../context');

return context.transactionPayment.findOne({ uuid: '84892770-7b33-49e2-9c23-73679ca7defd' })
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
