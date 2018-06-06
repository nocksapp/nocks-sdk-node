/**
 * Validate a required string
 *
 * @param string
 * @returns {boolean}
 */
const isValidRequiredString = (string) => !!(string && typeof string === 'string' && string.trim());

/**
 * Validate a not empty array
 *
 * @param array
 * @returns {boolean}
 */
const isNotEmptyArray = (array) => !!(Array.isArray(array) && array.length);

module.exports = {
  isValidRequiredString,
  isNotEmptyArray,
};
