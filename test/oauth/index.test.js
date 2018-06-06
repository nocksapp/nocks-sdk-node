const chai = require('chai');
const sinon = require('sinon');
const proxyquire =  require('proxyquire');

const postTokenResponse = require('../mocks/post_token_response');
const postRefreshTokenResponse = require('../mocks/post_refresh_token_response');
const postPasswordGrantTokenResponse = require('../mocks/post_password_grant_token_response');

const stub = sinon.stub();

const Oauth = proxyquire('../../src/oauth', {
  '../helpers': {
    makeRequest: stub,
  }
});

const expect = chai.expect;
const validScope = {
  clientId: '1',
  scopes: ['user.read'],
  redirectUri: 'https://www.example.com',
  clientSecret: '123',
};

afterEach(() => {
  stub.reset();
});

describe('scope', () => {
  it('should throw an error when an invalid platform is given', () => {
    const message = '"platform" must be one of: "production, sandbox"';

    expect(() => Oauth.scope({ platform: 'invalid_platform' })).to.throw(message);

    expect(() => Oauth.scope({ platform: 'sandbox', clientId: '1', scopes: ['user.read'], redirectUri: 'test' })).to.not.throw();
    expect(() => Oauth.scope({ platform: 'production', clientId: '1', scopes: ['user.read'], redirectUri: 'test' })).to.not.throw();
  });

  it('should throw an error when no (valid) clientId is given', () => {
    const message = 'Invalid "clientId", must be a (not-empty) string or null';

    expect(() => Oauth.scope({ clientId: '', scopes: ['user.read'], redirectUri: 'test' })).to.throw(message);
    expect(() => Oauth.scope({ clientId: '  ', scopes: ['user.read'], redirectUri: 'test' })).to.throw(message);

    expect(() => Oauth.scope({ clientId: '1', scopes: ['user.read'], redirectUri: 'test' })).to.not.throw();
  });

  it('should throw an error when no (valid) scopes array is given', () => {
    const message = 'Invalid "scopes", must be an array with at least one element or null';

    expect(() => Oauth.scope({ clientId: '1', scopes: '', redirectUri: 'test' })).to.throw(message);
    expect(() => Oauth.scope({ clientId: '1', scopes: [], redirectUri: 'test' })).to.throw(message);

    expect(() => Oauth.scope({ clientId: '1', scopes: ['user.read'], redirectUri: 'test' })).to.not.throw();
  });

  it('should throw an error when an invalid redirectUri is given', () => {
    const message = 'Invalid "redirectUri", must be a (not-empty) string or null';

    expect(() => Oauth.scope({ clientId: '1', scopes: ['user.read'], redirectUri: '' })).to.throw(message);
    expect(() => Oauth.scope({ clientId: '1', scopes: ['user.read'], redirectUri: '   ' })).to.throw(message);

    expect(() => Oauth.scope({ clientId: '1', scopes: ['user.read'], redirectUri: 'test' })).to.not.throw();
    expect(() => Oauth.scope({ clientId: '1', scopes: ['user.read'], redirectUri: null })).to.not.throw();
    expect(() => Oauth.scope({ clientId: '1', scopes: ['user.read'], redirectUri: undefined })).to.not.throw();
  });

  it('should throw an error when an invalid clientSecret is given', () => {
    const message = 'Invalid "clientSecret", must be a (not-empty) string or null';

    expect(() => Oauth.scope({ clientId: '1', scopes: ['user.read'], redirectUri: 'test', clientSecret: ' ' })).to.throw(message);

    expect(() => Oauth.scope({ clientId: '1', scopes: ['user.read'], redirectUri: 'test' })).to.not.throw();
    expect(() => Oauth.scope({ clientId: '1', scopes: ['user.read'], redirectUri: 'test', clientSecret: null })).to.not.throw();
    expect(() => Oauth.scope({ clientId: '1', scopes: ['user.read'], redirectUri: 'test', clientSecret: undefined })).to.not.throw();
  });

  it('should return the correct functions', () => {
    expect(Oauth.scope(validScope)).to.have.all.keys([
      'getOauthUri', 'requestToken', 'refreshToken', 'passwordGrantToken', 'scopes', 'tokenScopes'
    ]);
  });

  describe('getOauthUri', () => {
    it ('should return the oauth uri', () => {
      const expectedUri = 'https://www.nocks.com/oauth/authorize?client_id=1&redirect_uri=https://www.example.com&response_type=code&scope=user.read&state=state';
      expect(Oauth.scope(validScope).getOauthUri({state: 'state'})).to.be.equal(expectedUri);
    });
  });

  describe('requestToken', () => {
    it ('should reject when no clientSecret is given', (done) => {
      const NocksOauth = Oauth.scope(Object.assign({}, validScope, { clientSecret: null }));

      NocksOauth.requestToken({ code: '123' })
        .then(() => {
          done(new Error('Expected "requestToken" to reject'));
        })
        .catch((err) => {
          expect(err.message).to.be.equal('Cannot request a token without a clientSecret configured');

          done();
        });
    });

    it ('should reject when no redirectUri is given', (done) => {
      const NocksOauth = Oauth.scope(Object.assign({}, validScope, { redirectUri: null }));

      NocksOauth.requestToken({ code: '123' })
        .then(() => {
          done(new Error('Expected "requestToken" to reject'));
        })
        .catch((err) => {
          expect(err.message).to.be.equal('Cannot request a token without a redirectUri configured');

          done();
        });
    });

    it ('should reject when no (valid) code is given', (done) => {
      const NocksOauth = Oauth.scope(validScope);

      NocksOauth.requestToken({})
        .then(() => {
          done(new Error('Expected "requestToken" to reject'));
        })
        .catch((err) => {
          expect(err.message).to.be.equal('Cannot request a token without a given "code"');

          done();
        });
    });

    it ('should return the transformed response', (done) => {
      stub.returns(Promise.resolve(postTokenResponse));

      const NocksOauth = Oauth.scope(validScope);
      NocksOauth.requestToken({ code: '123' })
        .then((result) => {
          expect(result).to.have.property('expires_on').to.be.a('date');
          expect(result).to.have.property('token_type').to.be.equal('Bearer');
          expect(result).to.have.property('expires_in').to.be.equal(31536000);
          expect(result).to.have.property('access_token').to.be.equal('super_secret');
          expect(result).to.have.property('refresh_token').to.be.equal('super_secret');

          done();
        })
        .catch(done);
    });
  });

  describe('refreshToken', () => {
    it ('should reject when no clientSecret is given', (done) => {
      const NocksOauth = Oauth.scope(Object.assign({}, validScope, { clientSecret: null }));

      NocksOauth.refreshToken({ refreshToken: 'super_secret' })
        .then(() => {
          done(new Error('Expected "refreshToken" to reject'));
        })
        .catch((err) => {
          expect(err.message).to.be.equal('Cannot refresh a token without a clientSecret configured');

          done();
        });
    });

    it ('should reject when no (valid) refreshToken is given', (done) => {
      const NocksOauth = Oauth.scope(validScope);

      NocksOauth.refreshToken({})
        .then(() => {
          done(new Error('Expected "refreshToken" to reject'));
        })
        .catch((err) => {
          expect(err.message).to.be.equal('Cannot refresh a token without a given "refreshToken"');

          done();
        });
    });

    it ('should return the transformed response', (done) => {
      stub.returns(Promise.resolve(postRefreshTokenResponse));

      const NocksOauth = Oauth.scope(validScope);
      NocksOauth.refreshToken({ refreshToken: 'super_secret' })
        .then((result) => {
          expect(result).to.have.property('expires_on').to.be.a('date');
          expect(result).to.have.property('token_type').to.be.equal('Bearer');
          expect(result).to.have.property('expires_in').to.be.equal(31536000);
          expect(result).to.have.property('access_token').to.be.equal('super_secret');
          expect(result).to.have.property('refresh_token').to.be.equal('super_secret');

          done();
        })
        .catch(done);
    });
  });

  describe('passwordGrantToken', () => {
    it ('should reject when no clientSecret is given', (done) => {
      const NocksOauth = Oauth.scope(Object.assign({}, validScope, { clientSecret: null }));

      NocksOauth.passwordGrantToken({ username: 'foo', password: 'bar' })
        .then(() => {
          done(new Error('Expected "passwordGrantToken" to reject'));
        })
        .catch((err) => {
          expect(err.message).to.be.equal('Cannot password grant a token without a clientSecret configured');

          done();
        });
    });

    it ('should reject when no (valid) username is given', (done) => {
      const NocksOauth = Oauth.scope(validScope);

      NocksOauth.passwordGrantToken({ password: 'bar' })
        .then(() => {
          done(new Error('Expected "passwordGrantToken" to reject'));
        })
        .catch((err) => {
          expect(err.message).to.be.equal('Cannot password grant a token without a valid username');

          done();
        });
    });

    it ('should reject when no (valid) password is given', (done) => {
      const NocksOauth = Oauth.scope(validScope);

      NocksOauth.passwordGrantToken({ username: 'foo' })
        .then(() => {
          done(new Error('Expected "passwordGrantToken" to reject'));
        })
        .catch((err) => {
          expect(err.message).to.be.equal('Cannot password grant a token without a valid password');

          done();
        });
    });

    it ('should return the transformed response', (done) => {
      stub.returns(Promise.resolve(postPasswordGrantTokenResponse));

      const NocksOauth = Oauth.scope(validScope);
      NocksOauth.passwordGrantToken({ username: 'foo', password: 'bar' })
        .then((result) => {
          expect(result).to.have.property('expires_on').to.be.a('date');
          expect(result).to.have.property('token_type').to.be.equal('Bearer');
          expect(result).to.have.property('expires_in').to.be.equal(31536000);
          expect(result).to.have.property('access_token').to.be.equal('super_secret');
          expect(result).to.have.property('refresh_token').to.be.equal('super_secret');

          done();
        })
        .catch(done);
    });
  });
});