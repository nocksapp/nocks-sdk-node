const context = require('../context');

return context.address.create({
  name: 'Nocks office',
  street1: 'van Lodensteinstraat 25',
  street2: 'Floor 3',
  city: 'Zoetermeer',
  region: 'Zuid-Holland',
  postal_code: '2722CG',
  country: 'NL'
})
  .then((address) => {
    console.log(address);

    /**
     * For the additional properties for address check ./findOne
     */
  });
