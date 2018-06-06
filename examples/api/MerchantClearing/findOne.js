const scope = require('../scope');

const merchant = { uuid: 'c2f04749-2088-4419-9b92-c0aab80287f2' };

return scope.merchantClearing.findOne(merchant, { uuid: 'f6c168ff-5df3-4600-906b-321b66fa29cc' })
  .then((merchantClearing) => {
    console.log(merchantClearing);
    console.log(merchantClearing.amount.value);

    merchantClearing.merchant_clearing_items.forEach((item) => {
      console.log(item.amount.value);
      console.log(item.isPaid());
    });
  });
