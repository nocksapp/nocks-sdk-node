const AmountTransformer = require('./Amount');
const DateTransformer = require('./Date');

/**
 * Transform tradeMarketHistory
 *
 * @param tradeMarketHistory
 */
const transform = (tradeMarketHistory) => AmountTransformer.transform(
  DateTransformer.transform(
    Object.assign({}, tradeMarketHistory)
  )
);

/**
 * Reverse transform tradeMarket
 *
 * @param tradeMarketHistory
 */
const reverseTransform = (tradeMarketHistory) => AmountTransformer.reverseTransform(
  DateTransformer.reverseTransform(
    Object.assign({}, tradeMarketHistory)
  )
);

module.exports = {
  transform,
  reverseTransform,
};
