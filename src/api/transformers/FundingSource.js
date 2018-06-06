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
 */
const reverseTransform = (fundingSource) => AmountTransformer.reverseTransform(
  DateTransformer.reverseTransform(
    Object.assign({}, fundingSource)
  )
);

module.exports = {
  transform,
  reverseTransform,
};
