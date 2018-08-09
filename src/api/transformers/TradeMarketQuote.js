const AmountTransformer = require('./Amount');

/**
 * Transform a "Nocks API" trade market quote
 *
 * @param quote
 */
const transform = (quote) => AmountTransformer.transform(Object.assign({}, quote));

module.exports = {
  transform,
};
