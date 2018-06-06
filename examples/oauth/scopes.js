/**
 * Note: scopes is a public resource and therefore the scope doesn't need any configuration
 */
const scope = require('./scope');

return scope.scopes()
  .then((scopes) => {
    console.log(scopes);
  });
