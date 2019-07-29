const context = require('../context');

return context.tradeOrder.findOne({ uuid: '9db8db25-3b38-4516-9bde-809bbe312df8' })
  .then((tradeOrder) => {
    console.log(tradeOrder);
    console.log(tradeOrder.amount.value);
    console.log(tradeOrder.amount_filled.value);
    console.log(tradeOrder.amount_cost.value);
    console.log(tradeOrder.amount_fee.value);
    console.log(tradeOrder.amount_fillable.value);

    console.log(tradeOrder.isOpen());
    console.log(tradeOrder.isCancelled());
    console.log(tradeOrder.isFilled());
  });
