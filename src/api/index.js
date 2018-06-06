const { isValidRequiredString } = require('../helpers');
const { ConfigurationError } = require('./../errors');
const constants = require('./../constants');
const initialConfig = require('./../config');

const User = require('./User');
const Transaction = require('./Transaction');
const TransactionPayment = require('./TransactionPayment');
const Merchant = require('./Merchant');
const MerchantClearing = require('./MerchantClearing');
const MerchantInvoice = require('./MerchantInvoice');
const MerchantProfile = require('./MerchantProfile');
const Bill = require('./Bill');
const TradeMarket = require('./TradeMarket');
const FundingSource = require('./FundingSource');
const Balance = require('./Balance');
const TradeOrder = require('./TradeOrder');
const Withdrawal = require('./Withdrawal');
const Deposit = require('./Deposit');

/**
 * Configure API accesses
 *
 * @param platform
 * @param accessToken - Not required for public resources
 * @param config - Additional config
 */
const scope = ({ platform = constants.platform.PRODUCTION.name, accessToken = null } = {}, config = {}) => {
  const platforms = Object.values(constants.platform);
  const platformNames = platforms.map((x) => x.name);

  if (!isValidRequiredString(platform) || !platformNames.includes(platform)) {
    throw new ConfigurationError(`"platform" must be one of ${platformNames.join(',')}`);
  }

  const apiConfig = Object.assign({}, config, initialConfig[platform], {
    baseUrl: platforms.find((x) => x.name === platform).api,
    accessToken,
  });

  return {
    user: User(apiConfig),
    transaction: Transaction(apiConfig),
    transactionPayment: TransactionPayment(apiConfig),
    merchant: Merchant(apiConfig),
    merchantClearing: MerchantClearing(apiConfig),
    merchantInvoice: MerchantInvoice(apiConfig),
    merchantProfile: MerchantProfile(apiConfig),
    bill: Bill(apiConfig),
    tradeMarket: TradeMarket(apiConfig),
    fundingSource: FundingSource(apiConfig),
    balance: Balance(apiConfig),
    tradeOrder: TradeOrder(apiConfig),
    withdrawal: Withdrawal(apiConfig),
    deposit: Deposit(apiConfig),
  };
};

module.exports = {
  scope,
};
