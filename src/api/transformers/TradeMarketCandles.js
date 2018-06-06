const AmountTransformer = require('./Amount');

/**
 * Transform tradeMarketCandles
 *
 * @param tradeMarketCandles
 */
const transform = (tradeMarketCandles) => AmountTransformer.transform(Object.assign({}, tradeMarketCandles));

/**
 * Reverse transform tradeMarketCandles
 *
 * @param tradeMarketCandles
 */
const reverseTransform = (tradeMarketCandles) => AmountTransformer.reverseTransform(Object.assign({}, tradeMarketCandles));

module.exports = {
  transform,
  reverseTransform,
};
