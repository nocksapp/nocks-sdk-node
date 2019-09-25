const merge = require('lodash.merge');
const { isValidRequiredString } = require('../helpers');
const { ConfigurationError } = require('./../errors');
const constants = require('./../constants');
const initialConfig = require('./../config');

const Address = require('./Address');
const Balance = require('./Balance');
const Bill = require('./Bill');
const Deposit = require('./Deposit');
const Fee = require('./Fee');
const FundingSource = require('./FundingSource');
const Merchant = require('./Merchant');
const MerchantClearing = require('./MerchantClearing');
const MerchantInvoice = require('./MerchantInvoice');
const MerchantProfile = require('./MerchantProfile');
const NotificationFilter = require('./NotificationFilter');
const PaymentAddress = require('./PaymentAddress');
const Raw = require('./Raw');
const Setting = require('./Setting');
const TradeMarket = require('./TradeMarket');
const TradeOrder = require('./TradeOrder');
const Transaction = require('./Transaction');
const TransactionPayment = require('./TransactionPayment');
const User = require('./User');
const Withdrawal = require('./Withdrawal');

/**
 * Configure API accesses
 *
 * @param platform
 * @param accessToken - Not required for public resources
 * @param config - Additional config
 */
const context = ({ platform = constants.platform.PRODUCTION.name, accessToken = null, ...config } = {}) => {
  const platforms = Object.values(constants.platform);
  const platformNames = platforms.map((x) => x.name);

  if (!isValidRequiredString(platform) || !platformNames.includes(platform)) {
    throw new ConfigurationError(`"platform" must be one of ${platformNames.join(',')}`);
  }

  const platformConstants = platforms.find((x) => x.name === platform);
  const apiConfig = merge({}, config, initialConfig[platform], {
    baseUrl: platformConstants.api,
    accessToken,
    platform: platformConstants,
  });

  return {
    address: Address(apiConfig),
    balance: Balance(apiConfig),
    bill: Bill(apiConfig),
    deposit: Deposit(apiConfig),
    fee: Fee(apiConfig),
    fundingSource: FundingSource(apiConfig),
    merchant: Merchant(apiConfig),
    merchantClearing: MerchantClearing(apiConfig),
    merchantInvoice: MerchantInvoice(apiConfig),
    merchantProfile: MerchantProfile(apiConfig),
    notificationFilter: NotificationFilter(apiConfig),
    paymentAddress: PaymentAddress(apiConfig),
    raw: Raw(apiConfig),
    setting: Setting(apiConfig),
    tradeMarket: TradeMarket(apiConfig),
    tradeOrder: TradeOrder(apiConfig),
    transaction: Transaction(apiConfig),
    transactionPayment: TransactionPayment(apiConfig),
    user: User(apiConfig),
    withdrawal: Withdrawal(apiConfig),
  };
};

module.exports = {
  context,
};
