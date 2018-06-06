const AmountTransformer = require('./Amount');

/**
 * Transform tradeMarketDistribution
 *
 * @param tradeMarketDistribution
 */
const transform = (tradeMarketDistribution) => Object.assign({}, {
  NLG: tradeMarketDistribution.NLG.map(AmountTransformer.transform),
  EUR: tradeMarketDistribution.EUR.map(AmountTransformer.transform),
});

/**
 * Reverse transform tradeMarket
 *
 * @param tradeMarketDistribution
 */
const reverseTransform = (tradeMarketDistribution) => Object.assign({}, {
  NLG: tradeMarketDistribution.NLG.map(AmountTransformer.reverseTransform),
  EUR: tradeMarketDistribution.EUR.map(AmountTransformer.reverseTransform),
});

module.exports = {
  transform,
  reverseTransform,
};
