const DateTransformer = require('./Date');
const AmountTransformer = require('./Amount');

/**
 * Transform
 *
 * @param turnover
 */
const transform = (turnover) => {
  const copy = Object.assign({}, turnover);

  if (turnover.period) {
    copy.period = DateTransformer.transform(copy.period);
  }

  return DateTransformer.transform(AmountTransformer.transform(copy));
};

/**
 * Reverse transform
 *
 * @param turnover
 * @param prepareForRequest
 */
const reverseTransform = (turnover, { prepareForRequest = false } = {}) => {
  const copy = Object.assign({}, turnover);

  if (turnover.period) {
    copy.period = DateTransformer.reverseTransform(copy.period);
  }

  return DateTransformer.reverseTransform(
    AmountTransformer.reverseTransform(copy)
    , { prepareForRequest },
  );
};

module.exports = {
  transform,
  reverseTransform,
};
