const DateTransformer = require('./Date');
const AmountTransformer = require('./Amount');
const PaymentTransformer = require('./Payment');
const StatusTransitionTransformer = require('./StatusTransition');
const MerchantClearingDistributionTransformer = require('./MerchantClearingDistribution');
const PaymentMethodTransformer = require('./PaymentMethod');
const constants = require('./../../constants');

/**
 * Transform a "Nocks API" transaction
 *
 * @param transaction
 */
const transform = (transaction) => AmountTransformer.transform(DateTransformer.transform(Object.assign({}, transaction, {
  // Add status functions
  isOpen: () => transaction.status === constants.transaction.OPEN,
  isPending: () => transaction.status === constants.transaction.PENDING,
  isCancelled: () => transaction.status === constants.transaction.CANCELLED,
  isPaid: () => transaction.status === constants.transaction.PAID,
  isExpired: () => transaction.status === constants.transaction.EXPIRED,
  isRefunded: () => transaction.status === constants.transaction.REFUNDED,

  payments: transaction.payments && transaction.payments.data
    ? transaction.payments.data.map(PaymentTransformer.transform) : undefined,

  status_transitions: transaction.status_transitions && transaction.status_transitions.data
    ? transaction.status_transitions.data.map(StatusTransitionTransformer.transform) : undefined,

  clearing_distribution: transaction.clearing_distribution && transaction.clearing_distribution.data
    ? transaction.clearing_distribution.data.map(MerchantClearingDistributionTransformer.transform) : undefined,

  payment_method: transaction.payment_method && transaction.payment_method.data
    ? PaymentMethodTransformer.transform(transaction.payment_method.data) : undefined,
})));

/**
 * Reverse transform
 *
 * @param transaction
 * @param prepareForRequest
 */
const reverseTransform = (transaction, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  if (transaction.payments && !prepareForRequest) {
    reverseObject.payments = {
      data: transaction.payments.map((payment) => PaymentTransformer.reverseTransform(payment, { prepareForRequest })),
    };
  }

  if (transaction.status_transitions && !prepareForRequest) {
    reverseObject.status_transitions = {
      data: transaction.status_transitions.map(StatusTransitionTransformer.reverseTransform),
    };
  }

  if (transaction.clearing_distribution && !prepareForRequest) {
    reverseObject.clearing_distribution = {
      data: transaction.clearing_distribution.map(MerchantClearingDistributionTransformer.reverseTransform),
    };
  }

  if (transaction.payment_method && !prepareForRequest) {
    reverseObject.payment_method = {
      data: PaymentMethodTransformer.reverseTransform(transaction.payment_method),
    };
  }

  return AmountTransformer.reverseTransform(
    DateTransformer.reverseTransform(Object.assign({}, transaction, reverseObject), { prepareForRequest })
  );
};

module.exports = {
  transform,
  reverseTransform,
};
