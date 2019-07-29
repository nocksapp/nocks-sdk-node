/**
 * Note: scopes is a public resource and therefore the context doesn't need any configuration
 */
const context = require('./context');

return context.scopes()
  .then((scopes) => {
    console.log(scopes);
  });
