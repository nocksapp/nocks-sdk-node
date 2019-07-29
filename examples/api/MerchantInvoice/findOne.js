const context = require('../context');

const merchant = { uuid: 'c2f04749-2088-4419-9b92-c0aab80287f2' };

return context.merchantInvoice.findOne(merchant, { uuid: 'b74adcd5-5c52-42b2-b3a3-bc40c5a7fbe7' })
  .then((merchantInvoice) => {
    console.log(merchantInvoice);

    merchantInvoice.merchant_clearings.forEach((merchantClearing) => {
      // See ../MerchantClearing/findOne
      console.log(merchantClearing);
    });

    console.log(merchantInvoice.isOpen());
    console.log(merchantInvoice.isPaid());
    console.log(merchantInvoice.isExpired());
  });
