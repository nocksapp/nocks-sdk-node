const DateTransformer = require('./Date');

/**
 * Transform a "Nocks API" notificationFilter
 *
 * @param notificationFilter
 */
const transform = (notificationFilter) => DateTransformer.transform(Object.assign({}, notificationFilter));

/**
 * Reverse back to a "Nocks API" notificationFilter
 *
 * @param notificationFilter
 * @param prepareForRequest
 */
const reverseTransform = (notificationFilter, { prepareForRequest = false } = {}) => DateTransformer.reverseTransform(
  Object.assign({}, notificationFilter), { prepareForRequest }
);

module.exports = {
  transform,
  reverseTransform,
};
