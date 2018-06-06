/**
 * Note: tokenScopes doesn't need any configuration from the oauth scope. The user accessToken is passed as function argument.
 */
const scope = require('./scope');

return scope.tokenScopes({ accessToken: '123' })
  .then((scopes) => {
    console.log(scopes);
  });
