const scope = require('../scope');

return scope.transactionPayment.refund({ uuid: '77bfcf23-eef6-4661-ba39-a77a703337a9' }, {
  refund_address: 'TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM',
  description: 'test',
})
  .then((payment) => {
    console.log(payment);

    console.log(payment.amount.value);
    console.log(payment.payment_method);
  });
