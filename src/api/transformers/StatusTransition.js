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
 * @returns {*}
 */
const reverseTransform = (statusTransition) => DateTransformer.reverseTransform(Object.assign({}, statusTransition));

module.exports = {
  transform,
  reverseTransform,
};
