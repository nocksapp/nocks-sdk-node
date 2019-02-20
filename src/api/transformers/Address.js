const DateTransformer = require('./Date');

/**
 * Transform a "Nocks API" address
 *
 * @param address
 */
const transform = (address) => DateTransformer.transform(Object.assign({}, address));

/**
 * Reverse back to a "Nocks API" address
 *
 * @param address
 */
const reverseTransform = (address) => DateTransformer.reverseTransform(Object.assign({}, address));

module.exports = {
  transform,
  reverseTransform,
};
