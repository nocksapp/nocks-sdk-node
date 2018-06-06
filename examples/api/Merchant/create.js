const scope = require('../scope');

return scope.merchant.create({
  name: 'Nocks B.V.',
  email: 'support@nocks.co',
  website: 'https://nocks.co',
  address: 'Dorpstraat',
  number: '24',
  zip_code: '1234 AB',
  city: 'Zoetermeer',
  country: 'NL',
  phone: '+31612345678',
  coc: '64502260',
  vat: 'NL855693915B01',
  clearing_distribution: [
    {
      currency: 'EUR',
      percentage: 80,
      address: 'NL16ABNA0602167736'
    },
    {
      currency: 'NLG',
      percentage: 20,
      address: 'TNZQU2V1K3qu8ntzHuJ5336AAUuG8WC6JD'
    }
  ]
})
  .then((merchant) => {
    console.log(merchant);

    /**
     * For the additional properties for merchant check ./findOne
     */
  });
