const scope = require('./scope');

// Note that passwordGrantToken only works for allowed api clients
return scope.passwordGrantToken({ username: '', password: '' })
  .then(({ access_token, refresh_token, expires_on }) => {
    console.log(access_token);
    console.log(refresh_token);
    console.log(expires_on);
  });
