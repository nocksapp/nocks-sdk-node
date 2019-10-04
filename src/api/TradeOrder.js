const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const PaginationTransformer = require('./transformers/Pagination');
const TradeOrderTransformer = require('./transformers/TradeOrder');
const { positiveInteger, buildQueryString } = require('./../utilities');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Create a trade order
   *
   * @param data
   */
  const create = (data) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/trade-order',
    accessToken: config.accessToken,
    data: TradeOrderTransformer.reverseTransform(data, { prepareForRequest: true }),
  })
    .then((response) => TradeOrderTransformer.transform(response.data));

  /**
   * Get trade orders
   */
  const find = ({
    page = 1, limit = 15, tradeMarket = null, side = null, status = null, label = null, amountFilled = null,
  } = {}) => {
    const query = { page: positiveInteger(page, 1), limit: positiveInteger(limit, 15) };

    if (tradeMarket !== null) {
      query['trade-market'] = tradeMarket;
    }

    if (side !== null) {
      query.side = side;
    }

    if (status !== null) {
      query.status = status;
    }

    if (label !== null) {
      query.label = label;
    }

    if (amountFilled !== null) {
      query.amount_filled = amountFilled;
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/trade-order?${buildQueryString(query)}`,
      accessToken: config.accessToken,
    })
      .then((response) => ({
        data: response.data.map(TradeOrderTransformer.transform),
        pagination: PaginationTransformer.transform(response.meta.pagination),
      }));
  };

  /**
   * Get one trade order
   *
   * @param uuid
   */
  const findOne = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot find a trade order without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/trade-order/${uuid}`,
      accessToken: config.accessToken,
    })
      .then((response) => TradeOrderTransformer.transform(response.data));
  };

  /**
   * Cancel a trade order
   *
   * @param uuid
   */
  const cancel = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot cancel a trade order without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'DELETE',
      baseURL: config.baseUrl,
      url: `/trade-order/${uuid}`,
      accessToken: config.accessToken,
    });
  };

  return {
    create,
    find,
    findOne,
    cancel,
  };
};
