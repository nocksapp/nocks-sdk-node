const { stringToFloat, floatToString } = require('./../../utilities');
const constants = require('./../../constants');

const dateProperties = [
  'source_amount', 'target_amount', 'received_amount', 'fee_amount', 'amount', 'tip_amount',
  'fee', 'amount_fee', 'amount_fillable', 'amount_filled', 'amount_cost', 'amount_refunded',
  'amount_net', 'amount_vat', 'amount_gross', 'vat', 'rate', 'rate_actual',
  'tip', 'total', 'last', 'volume', 'quote_volume', 'base_volume', 'low', 'high', 'buy', 'sell', 'size',
  'base_sum', 'sum', 'cost', 'eur_value', 'average', 'open', 'close', 'available', 'reserved', 'stop_rate',
  'value_estimation', 'fixed',
];

/**
 * Transform data
 *
 * @param data
 * @returns {*}
 */
const transform = (data) => Object.assign({}, data, Object.keys(data).filter((key) => dateProperties.includes(key))
  .reduce((transformedData, key) => {
    if (data[key] && data[key].currency && data[key].amount !== undefined) {
      transformedData[key] = { // eslint-disable-line no-param-reassign
        currency: data[key].currency,
        amount: data[key].amount,
        value: stringToFloat(data[key].amount),
      };
    } else if (typeof data[key] === 'string') {
      transformedData[key] = stringToFloat(data[key], data[key]); // eslint-disable-line no-param-reassign
    }

    return transformedData;
  }, {}));

/**
 * Reverse transform
 *
 * @param data
 */
const reverseTransform = (data) => Object.assign({}, data, Object.keys(data).filter((key) => dateProperties.includes(key))
  .reduce((transformedData, key) => {
    if (data[key] && data[key].currency && (data[key].amount !== undefined || data[key].value !== undefined)) {
      if (data[key].value !== undefined) {
        const decimals = constants.decimals[data[key].currency];
        if (decimals === undefined) {
          throw new Error(`Unsupported currency "${data[key].currency}"`);
        }

        // Use the value as amount
        if (data[key].value > 0) {
          transformedData[key] = { // eslint-disable-line no-param-reassign
            currency: data[key].currency,
            amount: floatToString(data[key].value, decimals),
          };
        } else {
          // Amount is to low, reset the amount
          transformedData[key] = null; // eslint-disable-line no-param-reassign
        }
      } else {
        transformedData[key] = data[key]; // eslint-disable-line no-param-reassign
      }
    } else if (typeof data[key] === 'number') {
      transformedData[key] = floatToString(data[key], 8); // eslint-disable-line no-param-reassign
    }

    return transformedData;
  }, {}));

module.exports = {
  transform,
  reverseTransform,
};
