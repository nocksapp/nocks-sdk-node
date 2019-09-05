const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const PaginationTransformer = require('./transformers/Pagination');
const TradeMarketTransformer = require('./transformers/TradeMarket');
const TradeMarketBookTransformer = require('./transformers/TradeMarketBook');
const TradeMarketHistoryTransformer = require('./transformers/TradeMarketHistory');
const TradeMarketDistributionTransformer = require('./transformers/TradeMarketDistribution');
const TradeMarketCandlesTransformer = require('./transformers/TradeMarketCandles');
const TradeMarketQuoteTransformer = require('./transformers/TradeMarketQuote');
const { positiveInteger, stringToFloat } = require('./../utilities');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Get trade markets
   */
  const find = ({ page = 1 } = {}) => makeRequest({
    ...config.request,
    baseURL: config.baseUrl,
    url: `/trade-market?page=${positiveInteger(page, 1)}`,
  })
    .then((response) => ({
      data: response.data.map(TradeMarketTransformer.transform),
      pagination: PaginationTransformer.transform(response.meta.pagination),
    }));

  /**
   * Get the trade market
   *
   * @param code
   */
  const findOne = ({ code }) => {
    // Code is required
    if (!isValidRequiredString(code)) {
      return Promise.reject(new ValidationError('Cannot retrieve market without "code"', constants.errors.INVALID_CODE));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/trade-market/${code}`,
    })
      .then((response) => TradeMarketTransformer.transform(response.data));
  };

  /**
   * Get the trade market book
   *
   * @param code
   * @param range
   */
  const book = ({ code, range = 100 }) => {
    // Code is required
    if (!isValidRequiredString(code)) {
      return Promise.reject(new ValidationError('Cannot retrieve market book without "code"', constants.errors.INVALID_CODE));
    }

    let url = `/trade-market/${code}/book/`;
    if (range) {
      url += `?range=${range}`;
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url,
    })
      .then((response) => TradeMarketBookTransformer.transform(response.data));
  };

  /**
   * Retrieve history of trade market
   *
   * @param code
   */
  const history = ({ code }) => {
    // Code is required
    if (!isValidRequiredString(code)) {
      return Promise.reject(new ValidationError('Cannot retrieve market history without "code"', constants.errors.INVALID_CODE));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/trade-market/${code}/history`,
    })
      .then((response) => response.data.map(TradeMarketHistoryTransformer.transform));
  };

  /**
   * Retrieve distribution of trade market
   *
   * @param code
   * @param positions
   */
  const distribution = ({ code, positions }) => {
    // Code is required
    if (!isValidRequiredString(code)) {
      return Promise.reject(new ValidationError('Cannot retrieve distribution without "code"', constants.errors.INVALID_CODE));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/trade-market/${code}/distribution/${positions}`,
    })
      .then((response) => TradeMarketDistributionTransformer.transform(response.data));
  };

  /**
   * Retrieve candles from the trade market
   *
   * @param code
   * @param start
   * @param end
   * @param interval
   * @param ohlcv
   */
  const candles = ({
    code, start, end, interval, ohlcv = false,
  }) => {
    // Code is required
    if (!isValidRequiredString(code)) {
      return Promise.reject(new ValidationError('Cannot retrieve candles without "code"', constants.errors.INVALID_CODE));
    }

    let url = `/trade-market/${code}/candles/${start}/${end}/${interval}`;
    if (ohlcv) {
      url += '?format=ohlcv';
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url,
    })
      .then((response) => {
        if (ohlcv) {
          return response.data.map((x) => x.map(stringToFloat));
        }

        return response.data.map(TradeMarketCandlesTransformer.transform);
      });
  };

  /**
   * Get the quote
   *
   * @param code
   * @param side
   * @param amount
   * @param amountType
   */
  const quote = ({
    code, side, amount, amountType,
  }) => {
    // Code is required
    if (!isValidRequiredString(code)) {
      return Promise.reject(new ValidationError('Cannot retrieve quote without "code"', constants.errors.INVALID_CODE));
    }

    // Side is required
    if (!isValidRequiredString(side)) {
      return Promise.reject(new ValidationError('Cannot retrieve quote without "side"', constants.errors.INVALID_SIDE));
    }

    const value = stringToFloat(amount);
    if (value <= 0) {
      return Promise.reject(new ValidationError('Cannot retrieve quote without valid "amount"', constants.errors.INVALID_AMOUNT));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/trade-market/${code}/quote/${side}/${value}/${amountType}`,
    })
      .then((response) => TradeMarketQuoteTransformer.transform(response.data));
  };

  return {
    find,
    findOne,
    book,
    history,
    distribution,
    candles,
    quote,
  };
};
