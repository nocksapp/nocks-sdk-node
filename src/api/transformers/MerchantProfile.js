const DateTransformer = require('./Date');

/**
 * Transform merchant profile
 *
 * @param merchantProfile
 * @returns {*}
 */
const transform = (merchantProfile) => DateTransformer.transform(Object.assign({}, merchantProfile));

/**
 * Reverse transform
 *
 * @param merchantProfile
 */
const reverseTransform = (merchantProfile) => DateTransformer.reverseTransform(Object.assign({}, merchantProfile));

module.exports = {
  transform,
  reverseTransform,
};
