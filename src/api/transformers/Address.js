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
 * @param prepareForRequest
 */
const reverseTransform = (address, { prepareForRequest = false } = {}) => DateTransformer.reverseTransform(
  Object.assign({}, address), { prepareForRequest }
);

module.exports = {
  transform,
  reverseTransform,
};
