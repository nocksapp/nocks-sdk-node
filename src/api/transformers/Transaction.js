const DateTransformer = require('./Date');
const AmountTransformer = require('./Amount');
const PaymentTransformer = require('./Payment');
const StatusTransitionTransformer = require('./StatusTransition');
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

  // Transform transaction payments and status transitions
  payments: transaction.payments && transaction.payments.data ?
    transaction.payments.data.map(PaymentTransformer.transform) : undefined,
  status_transitions: transaction.status_transitions && transaction.status_transitions.data ?
    transaction.status_transitions.data.map(StatusTransitionTransformer.transform) : undefined,
})));

/**
 * Reverse transform
 *
 * @param transaction
 * @param prepareForRequest
 */
const reverseTransform = (transaction, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  // Reverse transform transaction payments and status transitions
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

  return AmountTransformer.reverseTransform(DateTransformer.reverseTransform(Object.assign({}, transaction, reverseObject)));
};

module.exports = {
  transform,
  reverseTransform,
};
