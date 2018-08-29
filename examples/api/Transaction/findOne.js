const scope = require('../scope');

return scope.transaction.findOne({ uuid: '7d419e21-a0de-4cb1-b2bd-26a461b1e884' })
  .then((transaction) => {
    console.log(transaction);

    transaction.payments.forEach((payment) => {
      console.log(payment.isOpen());
      console.log(payment.isPending());
      console.log(payment.isCancelled());
      console.log(payment.isPaid());
      console.log(payment.isExpired());
      console.log(payment.isRefunded());
    });

    console.log(transaction.status_transitions);

    console.log(transaction.isOpen());
    console.log(transaction.isPending());
    console.log(transaction.isCancelled());
    console.log(transaction.isPaid());
    console.log(transaction.isExpired());
    console.log(transaction.isRefunded());
  });
