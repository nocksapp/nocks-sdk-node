const scope = require('../scope');

return scope.balance.findOne({ currency: 'NLG' })
  .then((balance) => {
    console.log(balance);

    console.log(balance.total.value);
    console.log(balance.currency.deposit_payment_methods);
    console.log(balance.currency.withdrawal_payment_methods);
  });
