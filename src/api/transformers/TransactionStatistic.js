const AmountTransformer = require('./Amount');

/**
 * Transform a "Nocks API" transaction quote
 *
 * @param statistic
 */
const transform = (statistic) => AmountTransformer.transform(Object.assign({}, statistic));

/**
 * Reverse transform
 *
 * @param statistic
 */
const reverseTransform = (statistic) => AmountTransformer.reverseTransform(Object.assign({}, statistic));

module.exports = {
  transform,
  reverseTransform,
};
