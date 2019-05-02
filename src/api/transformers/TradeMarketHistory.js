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
 * @param prepareForRequest
 */
const reverseTransform = (tradeMarketHistory, { prepareForRequest = false } = {}) => AmountTransformer.reverseTransform(
  DateTransformer.reverseTransform(Object.assign({}, tradeMarketHistory), { prepareForRequest })
);

module.exports = {
  transform,
  reverseTransform,
};
