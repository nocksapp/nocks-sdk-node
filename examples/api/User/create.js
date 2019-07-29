/**
 * Note: user.create is a public resource and therefore the context doesn't need a accessToken
 */
const context = require('../context');

return context.user.create({
  gender: 'male',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@nocks.co',
  password: 'S3cretPassw0rd',
  local: 'nl_NL'
})
  .then((user) => {
    console.log(user);

    /**
     * For the additional properties for user check ./findOne
     */
  });
