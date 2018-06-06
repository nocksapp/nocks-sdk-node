const DateTransformer = require('./Date');
const AmountTransformer = require('./Amount');
const constants = require('./../../constants');

/**
 * Transform merchant clearing item
 *
 * @param merchantClearingItem
 * @returns {*}
 */
const transform = (merchantClearingItem) => DateTransformer.transform(AmountTransformer.transform(Object.assign({}, merchantClearingItem, {
  // Add status functions
  isOpen: () => merchantClearingItem.status === constants.merchantClearingItem.OPEN,
  isPaid: () => merchantClearingItem.status === constants.merchantClearingItem.PAID,
})));

/**
 * Reverse transform
 *
 * @param merchantClearingItem
 */
const reverseTransform = (merchantClearingItem) => DateTransformer.reverseTransform(
  AmountTransformer.reverseTransform(
    Object.assign({}, merchantClearingItem)
  )
);

module.exports = {
  transform,
  reverseTransform,
};
