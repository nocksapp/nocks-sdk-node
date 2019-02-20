const scope = require('../scope');

return scope.notificationFilter.create({
  method: 'callback',
  target: 'https://nocks.com/callback',
  resources: ['user', 'balance'],
})
  .then((notificationFilter) => {
    console.log(notificationFilter);

    /**
     * For the additional properties for notificationFilter check ./findOne
     */
  });
