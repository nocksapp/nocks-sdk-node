const context = require('../context');

return context.deposit.create({
  currency: 'NLG',
})
  .then((deposit) => {
    console.log(deposit);

    /**
     * For the additional properties for deposit check ./findOne
     */
  });
