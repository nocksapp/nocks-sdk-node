/**
 * Note: transaction.quote is a public resource and therefore the context doesn't need a accessToken
 */
const context = require('../context');

return context.transaction.quote({
  source_currency: 'EUR',
  target_currency: 'NLG',
  amount: {
    value: 250,
    currency: 'NLG',
  },
  payment_method: {
    method: 'ideal',
  },
})
  .then((quote) => {
    console.log(quote);
    console.log(quote.source_amount.value);
    console.log(quote.target_amount.value);
    console.log(quote.fee_amount.value);
  });
