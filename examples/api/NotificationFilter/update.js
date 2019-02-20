const scope = require('../scope');

return scope.notificationFilter.update({ uuid: '2ec01b61-420c-4092-be6e-79a1cc47d005' }, {
  target: 'http://www.example.com/callback'
})
  .then((notificationFilter) => {
    console.log(notificationFilter);

    /**
     * For the additional properties for notificationFilter check ./findOne
     */
  });
