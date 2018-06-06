const { dateToString } = require('./../../utilities');

const dateTimeProperties = [
  'created_at', 'updated_at', 'expire_at', 'issued_at', 'paid_at', 'due_at', 'start', 'end', 'filled_at', 'cancelled_at', 'active_at',
];

const dateProperties = [
  'date_start', 'date_end', 'date_next',
];

/**
 * Transform data
 *
 * @param data
 * @returns {*}
 */
const transform = (data) => Object.assign({}, data, Object.keys(data).filter((key) => dateTimeProperties.includes(key))
  .reduce((transformedData, key) => {
    if (data[key] && data[key].timestamp !== undefined) {
      if (!data[key].timestamp) {
        transformedData[key] = null; // eslint-disable-line no-param-reassign
      } else {
        transformedData[key] = new Date(data[key].timestamp * 1000); // eslint-disable-line no-param-reassign
      }
    }

    return transformedData;
  }, {}), Object.keys(data).filter((key) => dateProperties.includes(key))
  .reduce((transformedData, key) => {
    if (typeof data[key] === 'string') {
      const parsedDate = new Date(data[key]);
      if (!Number.isNaN(parsedDate.getTime())) {
        transformedData[key] = parsedDate; // eslint-disable-line no-param-reassign
      } else {
        transformedData[key] = null; // eslint-disable-line no-param-reassign
      }
    }

    return transformedData;
  }, {}));

/**
 * Reverse transform
 *
 * @param data
 * @param prepareForRequest
 */
const reverseTransform = (data, { prepareForRequest = false } = {}) => {
  if (prepareForRequest) {
    return Object.assign({}, data, Object.keys(data).filter((key) => dateTimeProperties.includes(key) || dateProperties.includes(key))
      .reduce((transformedData, key) => {
        transformedData[key] = dateToString(data[key], { withTime: dateTimeProperties.includes(key), defaultValue: data[key] }); // eslint-disable-line no-param-reassign

        return transformedData;
      }, {}));
  }

  return Object.assign({}, data, Object.keys(data).filter((key) => dateTimeProperties.includes(key))
    .reduce((transformedData, key) => {
      transformedData[key] = { // eslint-disable-line no-param-reassign
        datetime: dateToString(data[key], { defaultValue: data[key] }),
        timestamp: data[key].getTime() / 1000,
      };

      return transformedData;
    }, {}), Object.keys(data).filter((key) => dateProperties.includes(key))
    .reduce((transformedData, key) => {
      transformedData[key] = dateToString(data[key], { withTime: false, defaultValue: data[key] }); // eslint-disable-line no-param-reassign

      return transformedData;
    }, {}));
};

module.exports = {
  transform,
  reverseTransform,
};
