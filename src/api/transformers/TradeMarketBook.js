const AmountTransformer = require('./Amount');

/**
 * Transform tradeMarketBook
 *
 * @param tradeMarketBook
 */
const transform = (tradeMarketBook) => Object.assign({}, {
  buy: tradeMarketBook.buy.map(AmountTransformer.transform),
  sell: tradeMarketBook.sell.map(AmountTransformer.transform),
});

/**
 * Reverse transform tradeMarketBook
 *
 * @param tradeMarketBook
 */
const reverseTransform = (tradeMarketBook) => Object.assign({}, {
  buy: tradeMarketBook.buy.map(AmountTransformer.reverseTransform),
  sell: tradeMarketBook.sell.map(AmountTransformer.reverseTransform),
});

module.exports = {
  transform,
  reverseTransform,
};
