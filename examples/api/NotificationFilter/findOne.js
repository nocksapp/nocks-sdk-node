const context = require('../context');

return context.notificationFilter.findOne({ uuid: '2ec01b61-420c-4092-be6e-79a1cc47d005' })
  .then((notificationFilter) => {
    console.log(notificationFilter);
    console.log(notificationFilter.created_at.getTime());
    console.log(notificationFilter.updated_at.getTime());
  });
