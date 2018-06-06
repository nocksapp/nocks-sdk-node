const AmountTransformer = require('./Amount');

/**
 * Transform tradeMarket
 *
 * @param tradeMarket
 */
const transform = (tradeMarket) => AmountTransformer.transform(Object.assign({}, tradeMarket));

/**
 * Reverse transform tradeMarket
 *
 * @param tradeMarket
 */
const reverseTransform = (tradeMarket) => AmountTransformer.reverseTransform(Object.assign({}, tradeMarket));

module.exports = {
  transform,
  reverseTransform,
};
