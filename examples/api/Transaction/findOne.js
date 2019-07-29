const context = require('../context');

return context.transaction.findOne({ uuid: '741967d9-ed7b-413c-9a82-90c7069779f7' })
  .then((transaction) => {
    console.log(transaction);

    transaction.payments.forEach((payment) => {
      console.log(payment.isOpen());
      console.log(payment.isPending());
      console.log(payment.isCancelled());
      console.log(payment.isPaid());
      console.log(payment.isExpired());
      console.log(payment.isRefunded());

      console.log(payment.payment_method.isDefault());
    });

    console.log(transaction.status_transitions);

    console.log(transaction.isOpen());
    console.log(transaction.isPending());
    console.log(transaction.isCancelled());
    console.log(transaction.isPaid());
    console.log(transaction.isExpired());
    console.log(transaction.isRefunded());

    console.log(transaction.clearing_distribution);
  });
