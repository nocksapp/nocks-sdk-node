const context = require('../context');

return context.merchant.findOne({ uuid: 'c2f04749-2088-4419-9b92-c0aab80287f2' })
  .then((merchant) => {
    console.log(merchant);
    console.log(merchant.clearing_distribution); // clearing_distribution array
    console.log(merchant.merchant_profiles); // merchant_profiles array

    /**
     * Additional properties for a merchant.
     *
     * NOTE: these methods will all return a Promise
     */

    // Shortcut for MerchantClearing
    merchant.findClearings({ page: 1 });
    merchant.findClearing({ uuid: 'f6c168ff-5df3-4600-906b-321b66fa29cc' });

    // Shortcut for MerchantProfile
    merchant.createProfile({ name: 'Nocks B.V. - Location Groningen' });
    merchant.findProfiles({ page: 1 });
    merchant.findProfile({ uuid: 'f53593f0-05ff-41f8-bb04-39a079dd3872' });
    merchant.deleteProfile({ uuid: 'f53593f0-05ff-41f8-bb04-39a079dd3871' });

    // Shortcut for MerchantInvoice
    merchant.findInvoices({ page: 1 });
    merchant.findInvoice({ uuid: 'f53593f0-05ff-41f8-bb04-39a079dd3870' });
  });
