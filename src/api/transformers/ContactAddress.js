const DateTransformer = require('./Date');

/**
 * Transform
 *
 * @param contactAddress
 */
const transform = (contactAddress) => DateTransformer.transform(Object.assign({}, contactAddress));

/**
 * Reverse transform
 *
 * @param contactAddress
 */
const reverseTransform = (contactAddress) => DateTransformer.reverseTransform(Object.assign({}, contactAddress));

module.exports = {
  transform,
  reverseTransform,
};
