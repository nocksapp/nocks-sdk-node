const AmountTransformer = require('./Amount');
const DateTransformer = require('./Date');
const constants = require('./../../constants');

/**
 * Transform tradeOrder
 *
 * @param tradeOrder
 */
const transform = (tradeOrder) => AmountTransformer.transform(DateTransformer.transform(Object.assign({}, tradeOrder, {
  // Add status functions
  isOpen: () => tradeOrder.status === constants.tradeOrder.OPEN,
  isFilled: () => tradeOrder.status === constants.tradeOrder.FILLED,
  isCancelled: () => tradeOrder.status === constants.tradeOrder.CANCELLED,
})));

/**
 * Reverse transform tradeOrder
 *
 * @param tradeOrder
 * @param prepareForRequest
 */
const reverseTransform = (tradeOrder, { prepareForRequest = false } = {}) => AmountTransformer.reverseTransform(
  DateTransformer.reverseTransform(Object.assign({}, tradeOrder), { prepareForRequest }),
);

module.exports = {
  transform,
  reverseTransform,
};
