const context = require('../context');

return context.notificationFilter.create({
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
