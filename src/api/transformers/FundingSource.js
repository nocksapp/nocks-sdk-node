const AmountTransformer = require('./Amount');
const DateTransformer = require('./Date');

/**
 * Transform fundingSource
 *
 * @param fundingSource
 */
const transform = (fundingSource) => AmountTransformer.transform(
  DateTransformer.transform(
    Object.assign({}, fundingSource)
  )
);

/**
 * Reverse transform fundingSource
 *
 * @param fundingSource
 * @param prepareForRequest
 */
const reverseTransform = (fundingSource, { prepareForRequest = false } = {}) => AmountTransformer.reverseTransform(
  DateTransformer.reverseTransform(Object.assign({}, fundingSource), { prepareForRequest })
);

module.exports = {
  transform,
  reverseTransform,
};
