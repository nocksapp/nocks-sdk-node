const scope = require('../scope');

return scope.user.findAuthenticated()
  .then((user) => {
    console.log(user);
    console.log(user.is_enabled_two_factor);
  });
