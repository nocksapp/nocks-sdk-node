const DateTransformer = require('./Date');
const MerchantProfileTransformer = require('./MerchantProfile');
const MerchantClearingDistributionTransformer = require('./MerchantClearingDistribution');

const MerchantClearing = require('./../MerchantClearing');
const MerchantProfile = require('./../MerchantProfile');
const MerchantInvoice = require('./../MerchantInvoice');

/**
 * Transform a Nocks merchant
 *
 * @param merchant
 * @param config
 */
const transform = (merchant, config) => {
  const merchantClearing = MerchantClearing(config);
  const merchantProfile = MerchantProfile(config);
  const merchantInvoice = MerchantInvoice(config);

  return DateTransformer.transform(Object.assign({}, merchant, {
    // Merchant profiles
    merchant_profiles: merchant.merchant_profiles && merchant.merchant_profiles.data ?
      merchant.merchant_profiles.data.map(MerchantProfileTransformer.transform) : undefined,

    // Merchant clearings
    clearing_distribution: merchant.clearing_distribution && merchant.clearing_distribution.data ?
      merchant.clearing_distribution.data.map(MerchantClearingDistributionTransformer.transform) : undefined,

    // Clearing methods
    findClearing: ({ uuid }) => merchantClearing.findOne(merchant, { uuid }),
    findClearings: ({ page = 1 } = {}) => merchantClearing.find(merchant, { page }),

    // Profile methods
    createProfile: (data) => merchantProfile.create(merchant, data),
    findProfile: ({ uuid }) => merchantProfile.findOne(merchant, { uuid }),
    findProfiles: ({ page = 1 } = {}) => merchantProfile.find(merchant, { page }),
    deleteProfile: ({ uuid }) => merchantProfile.delete(merchant, { uuid }),

    // Invoice methods
    findInvoice: ({ uuid }) => merchantInvoice.findOne(merchant, { uuid }),
    findInvoices: ({ page = 1 } = {}) => merchantInvoice.find(merchant, { page }),
  }));
};

/**
 * Reverse transform
 *
 * @param merchant
 * @param prepareForRequest
 */
const reverseTransform = (merchant, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  // Merchant profiles
  if (merchant.merchant_profiles && !prepareForRequest) {
    reverseObject.merchant_profiles = {
      data: merchant.merchant_profiles.map(MerchantProfileTransformer.reverseTransform),
    };
  }

  // Merchant clearings
  if (merchant.clearing_distribution && !prepareForRequest) {
    reverseObject.clearing_distribution = {
      data: merchant.clearing_distribution.map(MerchantClearingDistributionTransformer.reverseTransform),
    };
  }

  return DateTransformer.reverseTransform(Object.assign({}, merchant, reverseObject));
};

module.exports = {
  transform,
  reverseTransform,
};
