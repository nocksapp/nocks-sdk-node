const { makeRequest, isValidRequiredString, isNotEmptyArray } = require('../helpers');
const { ValidationError, ConfigurationError } = require('./../errors/');
const constants = require('./../constants');
const initialConfig = require('./../config');

/**
 * Transform a token request response
 * @param response
 */
const transformTokenResponse = (response) => {
  const expiresOn = new Date();
  expiresOn.setSeconds(expiresOn.getSeconds() + response.expires_in);

  return Object.assign({}, response, {
    expires_on: expiresOn,
  });
};

/**
 * Configure Oauth
 *
 * @param platform
 * @param clientId
 * @param clientSecret
 * @param scopes
 * @param redirectUri
 * @param config
 */
const context = ({
  platform = constants.platform.PRODUCTION.name, clientId = null, clientSecret = null,
  scopes = null, redirectUri = null,
}, config = {}) => {
  const platforms = Object.values(constants.platform);
  const platformNames = platforms.map((x) => x.name);

  // Check required
  if (!isValidRequiredString(platform) || !platformNames.includes(platform)) {
    throw new ConfigurationError(`"platform" must be one of: "${platformNames.join(', ')}"`);
  }

  if (clientId !== null && !isValidRequiredString(clientId)) {
    throw new ConfigurationError('Invalid "clientId", must be a (not-empty) string or null');
  }

  if (scopes !== null && !isNotEmptyArray(scopes)) {
    throw new ConfigurationError('Invalid "scopes", must be an array with at least one element or null');
  }

  if (redirectUri !== null && !isValidRequiredString(redirectUri)) {
    throw new ConfigurationError('Invalid "redirectUri", must be a (not-empty) string or null');
  }

  if (clientSecret !== null && !isValidRequiredString(clientSecret)) {
    throw new ConfigurationError('Invalid "clientSecret", must be a (not-empty) string or null');
  }

  const oauthConfig = Object.assign({}, config, initialConfig[platform], {
    baseUrl: platforms.find((x) => x.name === platform).oauth,
  });

  return {
    /**
     * Get the Oauth uri
     *
     * @param state
     * @returns {string}
     */
    getOauthUri: ({ state = '' } = {}) => {
      if (clientId === null) {
        throw new ConfigurationError('Cannot setup an oauth uri without a clientId configured');
      }

      if (redirectUri === null) {
        throw new ConfigurationError('Cannot setup an oauth uri without a redirectUri configured');
      }

      if (scopes === null) {
        throw new ConfigurationError('Cannot setup an oauth uri without configured scopes');
      }

      return encodeURI(`${oauthConfig.baseUrl}/authorize?client_id=${clientId}` +
        `&redirect_uri=${redirectUri}&response_type=code&scope=${scopes.join(' ')}` +
        `&state=${state}`);
    },

    /**
     * Request a token by code. The code is returned by Nocks in the callback after authentication.
     *
     * @param code
     * @returns {Promise}
     */
    requestToken: ({ code }) => {
      if (clientId === null) {
        return Promise.reject(new ConfigurationError('Cannot request a token without a clientId configured'));
      }

      if (clientSecret === null) {
        return Promise.reject(new ConfigurationError('Cannot request a token without a clientSecret configured'));
      }

      if (redirectUri === null) {
        return Promise.reject(new ConfigurationError('Cannot request a token without a redirectUri configured'));
      }

      if (!isValidRequiredString(code)) {
        return Promise.reject(
          new ValidationError('Cannot request a token without a given "code"', constants.errors.INVALID_REQUEST_TOKEN_CODE)
        );
      }

      return makeRequest({
        ...oauthConfig.request,
        method: 'POST',
        baseURL: oauthConfig.baseUrl,
        url: '/token',
        data: {
          client_id: clientId,
          client_secret: clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
        },
      }, { callType: 'oauth' })
        .then((response) => transformTokenResponse(response));
    },

    /**
     * Refresh a Ouath token
     *
     * @param refreshToken
     * @returns {Promise}
     */
    refreshToken: ({ refreshToken }) => {
      if (clientId === null) {
        return Promise.reject(new ConfigurationError('Cannot refresh a token without a clientId configured'));
      }

      if (clientSecret === null) {
        return Promise.reject(new ConfigurationError('Cannot refresh a token without a clientSecret configured'));
      }

      if (!isValidRequiredString(refreshToken)) {
        return Promise.reject(
          new ValidationError('Cannot refresh a token without a given "refreshToken"', constants.errors.INVALID_REFRESH_TOKEN)
        );
      }

      return makeRequest({
        ...oauthConfig.request,
        method: 'POST',
        baseURL: oauthConfig.baseUrl,
        url: '/token',
        data: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
      }, { callType: 'oauth' })
        .then((response) => transformTokenResponse(response));
    },

    /**
     * Request a token by password and username
     *
     * @param username
     * @param password
     */
    passwordGrantToken: ({ username, password }) => {
      if (clientId === null) {
        return Promise.reject(new ConfigurationError('Cannot password grant a token without a clientId configured'));
      }

      if (clientSecret === null) {
        return Promise.reject(new ConfigurationError('Cannot password grant a token without a clientSecret configured'));
      }

      if (scopes === null) {
        return Promise.reject(new ConfigurationError('Cannot password grant a token without configured scopes'));
      }

      if (!isValidRequiredString(username)) {
        return Promise.reject(
          new ValidationError('Cannot password grant a token without a valid username', constants.errors.INVALID_USERNAME)
        );
      }

      if (!isValidRequiredString(password)) {
        return Promise.reject(
          new ValidationError('Cannot password grant a token without a valid password', constants.errors.INVALID_PASSWORD)
        );
      }

      return makeRequest({
        ...oauthConfig.request,
        method: 'POST',
        baseURL: oauthConfig.baseUrl,
        url: '/token',
        data: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'password',
          username,
          password,
          scope: scopes.join(' '),
        },
      }, { callType: 'oauth' })
        .then((response) => transformTokenResponse(response));
    },

    /**
     * Get the available scopes
     */
    scopes: () => makeRequest({
      ...oauthConfig.request,
      baseURL: oauthConfig.baseUrl,
      url: '/scopes',
    }, { callType: 'oauth' }),

    /**
     * Get the granted scopes
     */
    tokenScopes: ({ accessToken }) => makeRequest({
      ...oauthConfig.request,
      baseURL: oauthConfig.baseUrl,
      url: '/token-scopes',
      accessToken,
    }, { callType: 'oauth' }),
  };
};

module.exports = {
  context,
};
