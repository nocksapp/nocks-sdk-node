const context = require('../context');

return context.fundingSource.create({
  number: 'TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM',
  currency: 'NLG',
}, { twoFactorCode: '123456' })
  .then((fundingSource) => {
    console.log(fundingSource);

    /**
     * For the additional properties for fundingSource check ./findOne
     */
  });
