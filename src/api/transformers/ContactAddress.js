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
 * @param prepareForRequest
 */
const reverseTransform = (contactAddress, { prepareForRequest = false } = {}) =>
  DateTransformer.reverseTransform(Object.assign({}, contactAddress), { prepareForRequest });

module.exports = {
  transform,
  reverseTransform,
};
