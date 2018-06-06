const scope = require('../scope');

return scope.bill.findOne({ uuid: '8e7acf1a-2f76-47ff-8c9d-d1b5b2e5de3f' })
  .then((bill) => {
    console.log(bill);
    console.log(bill.amount.value);
    console.log(bill.transactions);

    bill.transactions.forEach((transaction) => {
      // Transaction object (see ../Transaction/findOne)
      console.log(transaction.isOpen());
      console.log(transaction.payments);
    });
  });