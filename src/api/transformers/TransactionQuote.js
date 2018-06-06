const AmountTransformer = require('./Amount');

/**
 * Transform a "Nocks API" transaction quote
 *
 * @param quote
 */
const transform = (quote) => AmountTransformer.transform(Object.assign({}, quote));

/**
 * Reverse transform
 *
 * @param quote
 */
const reverseTransform = (quote) => AmountTransformer.reverseTransform(Object.assign({}, quote));

module.exports = {
  transform,
  reverseTransform,
};
