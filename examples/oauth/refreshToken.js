const context = require('./context');

const refreshToken = '1234';
return context.refreshToken({ refreshToken })
  .then(({ access_token, refresh_token, expires_on }) => {
    console.log(access_token);
    console.log(refresh_token);
    console.log(expires_on);
  });
