const scope = require('./scope');

// Note: getOauthUri is not making a request to Nocks and doesn't return a promise. May throw an error however.
console.log(scope.getOauthUri({ state: 'state_string' }));
