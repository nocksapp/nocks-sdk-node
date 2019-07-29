const NocksOauth = require('../../src/oauth');

module.exports = NocksOauth.context({
  platform: 'sandbox',
  clientId: '1',
  clientSecret: '1',
  scopes: ['user.read', 'transaction.create'],
  redirectUri: 'http://www.example.com'
});
