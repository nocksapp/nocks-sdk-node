const context = require('../context');

return context.withdrawal.findOne({ uuid: 'b26fc003-04b6-4748-9e4c-4f5a0855a47a' })
  .then((withdrawal) => {
    console.log(withdrawal);
    console.log(withdrawal.amount.value);
    console.log(withdrawal.payment_method.isWithdrawalMethod());

    console.log(withdrawal.isOpen());
    console.log(withdrawal.isCompleted());
  });
