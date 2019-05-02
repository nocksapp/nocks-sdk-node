const DateTransformer = require('./Date');

/**
 * Transform a "Nocks API" statusTransition
 *
 * @param statusTransition
 */
const transform = (statusTransition) => DateTransformer.transform(Object.assign({}, statusTransition));

/**
 * Reverse transform statusTransition
 *
 * @param statusTransition
 * @param prepareForRequest
 * @returns {*}
 */
const reverseTransform = (statusTransition, { prepareForRequest = false } = {}) =>
  DateTransformer.reverseTransform(Object.assign({}, statusTransition), { prepareForRequest });

module.exports = {
  transform,
  reverseTransform,
};
