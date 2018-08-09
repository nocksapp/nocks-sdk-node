const DateTransformer = require('./Date');
const AmountTransformer = require('./Amount');

/**
 * Transform balance transfer data
 *
 * @param data
 */
const transform = (data) => AmountTransformer.transform(DateTransformer.transform(Object.assign({}, data, {
  payment_method: data.payment_method && data.payment_method.data ? data.payment_method.data : undefined,
})));

/**
 * Reverse transform balance transfer data
 *
 * @param data
 */
const reverseTransform = (data) => AmountTransformer.reverseTransform(data);

module.exports = {
  transform,
  reverseTransform,
};
