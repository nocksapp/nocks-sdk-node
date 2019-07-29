const context = require('../context');

return context.user.findAuthenticated()
  .then((user) => {
    console.log(user);
    console.log(user.is_enabled_two_factor);
  });
