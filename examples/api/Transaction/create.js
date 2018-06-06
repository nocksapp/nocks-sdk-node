const scope = require('../scope');

return scope.transaction.create({
  source_currency: 'NLG',
  target_currency: 'NLG',
  target_address: 'TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM',
  amount: {
    value: 250,
    currency: 'NLG'
  },
  payment_method: {
    method:'gulden',
  },
  metadata: {
    your_data_example_reference: '012345',
    your_data_example_customer_name: 'NOCKS BV'
  },
  redirect_url: 'https://nocks.com/redirect',
  callback_url: 'https://nocks.com/callback',
  locale: 'nl_NL'
})
  .then((transaction) => {
    console.log(transaction);

    /**
     * For the additional properties for transaction check ./findOne
     */
  });
