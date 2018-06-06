const scope = require('./scope');

const code = '1234';
return scope.requestToken({ code })
  .then(({ access_token, refresh_token, expires_on }) => {
    console.log(access_token);
    console.log(refresh_token);
    console.log(expires_on);
  });
