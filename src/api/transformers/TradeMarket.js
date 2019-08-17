const AmountTransformer = require('./Amount');

/**
 * Transform tradeMarket
 *
 * @param tradeMarket
 */
const transform = (tradeMarket) => AmountTransformer.transform(Object.assign({}, tradeMarket, {
  base_currency: tradeMarket.base_currency && tradeMarket.base_currency.data
    ? AmountTransformer.transform(tradeMarket.base_currency.data) : undefined,

  quote_currency: tradeMarket.quote_currency && tradeMarket.quote_currency.data
    ? AmountTransformer.transform(tradeMarket.quote_currency.data) : undefined,
}));

/**
 * Reverse transform tradeMarket
 *
 * @param tradeMarket
 * @param prepareForRequest
 */
const reverseTransform = (tradeMarket, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  if (tradeMarket.base_currency && !prepareForRequest) {
    reverseObject.base_currency = {
      data: AmountTransformer.reverseTransform(tradeMarket.base_currency),
    };
  }

  if (tradeMarket.quote_currency && !prepareForRequest) {
    reverseObject.quote_currency = {
      data: AmountTransformer.reverseTransform(tradeMarket.quote_currency),
    };
  }

  return AmountTransformer.reverseTransform(Object.assign({}, tradeMarket, reverseObject));
};

module.exports = {
  transform,
  reverseTransform,
};
