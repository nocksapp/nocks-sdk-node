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
 * @param prepareForRequest
 */
const reverseTransform = (merchantProfile, { prepareForRequest = false } = {}) =>
  DateTransformer.reverseTransform(Object.assign({}, merchantProfile), { prepareForRequest });

module.exports = {
  transform,
  reverseTransform,
};
