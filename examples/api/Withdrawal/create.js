const scope = require('../scope');

return scope.withdrawal.create({
  currency: 'NLG',
  amount: 100.00,
  address: 'TF7LzGAcCxYxoFjfJwxswua24s9wsMpwY8',
}, {
  twoFactorCode: '123456' // Required when withdrawal to a unverified address
})
  .then((withdrawal) => {
    console.log(withdrawal);

    /**
     * For the additional properties for withdrawal check ./findOne
     */
  });
