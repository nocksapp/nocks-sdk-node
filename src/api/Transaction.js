const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const PaginationTransformer = require('./transformers/Pagination');
const TransactionTransformer = require('./transformers/Transaction');
const TransactionQuoteTransformer = require('./transformers/TransactionQuote');
const TransactionStatisticTransformer = require('./transformers/TransactionStatistic');
const { positiveInteger, buildQueryString } = require('./../utilities');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Get a transaction price quote
   *
   * @param data
   */
  const quote = (data) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/transaction/quote',
    accessToken: config.accessToken || undefined, // Optional accessToken
    data: TransactionQuoteTransformer.reverseTransform(data),
  })
    .then((response) => TransactionQuoteTransformer.transform(response.data));

  /**
   * Create a transaction
   *
   * @param data
   */
  const create = (data) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/transaction',
    accessToken: config.accessToken || undefined, // Optional accessToken
    data: TransactionTransformer.reverseTransform(data, { prepareForRequest: true }),
  })
    .then((response) => TransactionTransformer.transform(response.data));

  /**
   * Get transactions
   */
  const find = ({
    page = 1, status = null, merchantProfileUuid = null, merchantReference = null, search = null,
  } = {}) => {
    const query = { page: positiveInteger(page, 1) };

    if (status !== null) {
      query.status = status;
    }

    if (merchantProfileUuid !== null) {
      query['merchant-profile'] = merchantProfileUuid;
    }

    if (merchantReference !== null) {
      query.merchant_reference = merchantReference;
    }

    if (search !== null) {
      query.search = search;
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/transaction?${buildQueryString(query)}`,
      accessToken: config.accessToken,
    })
      .then((response) => ({
        data: response.data.map(TransactionTransformer.transform),
        pagination: PaginationTransformer.transform(response.meta.pagination),
      }));
  };

  /**
   * Get one transaction
   *
   * @param uuid
   */
  const findOne = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot find a transaction without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/transaction/${uuid}`,
      accessToken: config.accessToken,
    })
      .then((response) => TransactionTransformer.transform(response.data));
  };

  /**
   * Cancel a transaction
   *
   * @param uuid
   */
  const cancel = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot cancel a transaction without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'DELETE',
      baseURL: config.baseUrl,
      url: `/transaction/${uuid}`,
      accessToken: config.accessToken,
    });
  };

  /**
   * Get the transaction statistics
   */
  const statistics = () => makeRequest({
    ...config.request,
    baseURL: config.baseUrl,
    url: '/transaction-statistics',
  })
    .then((response) => Object.keys(response.data)
      .reduce((obj, key) => Object.assign({}, obj, { [key]: TransactionStatisticTransformer.transform(response.data[key]) }), {}));

  return {
    quote,
    create,
    find,
    findOne,
    cancel,
    statistics,
  };
};
