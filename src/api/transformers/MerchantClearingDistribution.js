/**
 * Transform merchant clearing distribution
 *
 * @param merchantClearingDistribution
 * @returns {*}
 */
const transform = (merchantClearingDistribution) => Object.assign({}, merchantClearingDistribution);

/**
 * Reverse transform
 *
 * @param merchantClearingDistribution
 * @returns {*}
 */
const reverseTransform = (merchantClearingDistribution) => Object.assign({}, merchantClearingDistribution);

module.exports = {
  transform,
  reverseTransform,
};
