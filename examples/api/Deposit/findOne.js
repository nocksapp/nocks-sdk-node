const scope = require('../scope');

return scope.deposit.findOne({ uuid: 'cb121a0f-7a6d-4d0c-81a3-7433ee6f626f' })
  .then((deposit) => {
    console.log(deposit);
    console.log(deposit.isConfirmed());
    console.log(deposit.amount.value);
    console.log(deposit.payment_method.isDepositMethod());
  });
