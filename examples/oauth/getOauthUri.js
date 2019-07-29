const context = require('./context');

// Note: getOauthUri is not making a request to Nocks and doesn't return a promise. May throw an error however.
console.log(context.getOauthUri({ state: 'state_string' }));
