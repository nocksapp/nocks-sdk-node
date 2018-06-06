/**
 * Get the date string (yyyy-MM-dd hh:mm:ss) from a JS date
 *
 * @param date
 * @param withTime
 * @param defaultValue
 * @returns {string}
 */
const dateToString = (date, { withTime = true, defaultValue = '' } = {}) => {
  if (date instanceof Date) {
    const pad2 = (n) => (n < 10 ? '0' : '') + n;
    const dateCopy = new Date(date.getTime());

    // Nocks uses UTC +2
    dateCopy.setMinutes(dateCopy.getMinutes() + dateCopy.getTimezoneOffset() + 120);

    const m = dateCopy.getMonth() + 1;
    const d = dateCopy.getDate();

    const dateString = `${dateCopy.getFullYear()}-${pad2(m)}-${pad2(d)}`;
    if (withTime) {
      return `${dateString} ${pad2(dateCopy.getHours())}:${pad2(dateCopy.getMinutes())}:${pad2(dateCopy.getSeconds())}`;
    }

    return dateString;
  }

  return defaultValue;
};

/**
 * Get the positive integer value or the defaultValue
 *
 * @param integer
 * @param defaultValue
 * @returns {*}
 */
const positiveInteger = (integer, defaultValue = false) => {
  const parsed = Number.parseInt(integer, 10);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return defaultValue;
  }

  return parsed;
};

/**
 * Parse a string to a float
 *
 * @param string
 * @param defaultValue
 * @returns {number}
 */
const stringToFloat = (string, defaultValue = 0) => {
  const parsed = Number.parseFloat(string);

  if (Number.isNaN(parsed)) {
    return defaultValue;
  }

  return parsed;
};

/**
 * Float to string
 *
 * @param float
 * @param decimals
 */
const floatToString = (float, decimals = 2) => {
  if (typeof float === 'string') {
    return float;
  }

  return float.toFixed(decimals);
};

/**
 * Build a queryString by an object
 *
 * @param obj
 * @returns {string}
 */
const buildQueryString = (obj) => {
  const queryString = Object.keys(obj).reduce((string, key) => {
    if (obj[key] !== null) {
      return `${string}&${key}=${obj[key]}`;
    }

    return string;
  }, '');

  if (queryString.length > 0) {
    return queryString.substring(1);
  }

  return queryString;
};

module.exports = {
  dateToString,
  positiveInteger,
  stringToFloat,
  floatToString,
  buildQueryString,
};
