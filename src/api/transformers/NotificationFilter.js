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
 */
const reverseTransform = (notificationFilter) => DateTransformer.reverseTransform(Object.assign({}, notificationFilter));

module.exports = {
  transform,
  reverseTransform,
};
