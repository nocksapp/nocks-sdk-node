const DateTransformer = require('./Date');

/**
 * Transform a "Nocks API" user
 *
 * @param user
 */
const transform = (user) => DateTransformer.transform(Object.assign({}, user, {
  is_enabled_two_factor: user['2fa_enabled'],
}));

/**
 * Reverse back to a "Nocks API" user
 *
 * @param user
 */
const reverseTransform = (user) => {
  const reverseObject = {};

  if (user.is_enabled_two_factor) {
    reverseObject['2fa_enabled'] = user.is_enabled_two_factor;
  }

  return DateTransformer.reverseTransform(Object.assign({}, user, reverseObject));
};

module.exports = {
  transform,
  reverseTransform,
};
