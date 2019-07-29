/**
 * Note: tokenScopes doesn't need any configuration from the oauth context. The user accessToken is passed as function argument.
 */
const context = require('./context');

return context.tokenScopes({ accessToken: '123' })
  .then((scopes) => {
    console.log(scopes);
  });
