const scope = require('../scope');

return scope.user.update({ uuid: 'ac25ce10-83f7-456a-9a3c-582ca07cf699', twoFactorCode: '123456' }, {
  locale: 'en_US',
})
  .then((user) => {
    console.log(user);

    /**
     * For the additional properties for user check ./findOne
     */
  });
