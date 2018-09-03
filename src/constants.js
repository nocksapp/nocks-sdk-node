module.exports = {
  platform: {
    PRODUCTION: {
      name: 'production',
      web: 'https://www.nocks.com',
      oauth: 'https://www.nocks.com/oauth',
      api: 'https://api.nocks.com/api/v2',
    },
    SANDBOX: {
      name: 'sandbox',
      web: 'https://sandbox.nocks.com',
      oauth: 'https://sandbox.nocks.com/oauth',
      api: 'https://sandbox.nocks.com/api/v2',
    },
  },
  errors: {
    INVALID_TWO_FACTOR_CODE: 'invalid_two_factor_code',
    INVALID_REQUEST_TOKEN_CODE: 'invalid_request_token_code',
    INVALID_REFRESH_TOKEN: 'invalid_refresh_token',
    INVALID_USERNAME: 'invalid_username',
    INVALID_PASSWORD: 'invalid_password',
    INVALID_UUID: 'invalid_uuid',
    INVALID_MERCHANT: 'invalid_merchant',
    INVALID_CODE: 'invalid_code',
    INVALID_CURRENCY: 'invalid_currency',
    INVALID_SIDE: 'invalid_side',
    INVALID_AMOUNT: 'invalid_amount',
  },
  transaction: {
    OPEN: 'open',
    PENDING: 'pending',
    CANCELLED: 'cancelled',
    PAID: 'completed',
    EXPIRED: 'expired',
    REFUNDED: 'refunded',
  },
  payment: {
    OPEN: 'open',
    PENDING: 'pending',
    CANCELLED: 'cancelled',
    PAID: 'paid',
    EXPIRED: 'expired',
    REFUNDED: 'refunded',
  },
  merchantClearing: {
    OPEN: 'open',
    PAID: 'paid',
  },
  merchantClearingItem: {
    OPEN: 'open',
    PAID: 'paid',
  },
  merchantInvoice: {
    OPEN: 'open',
    PAID: 'paid',
    EXPIRED: 'expired',
  },
  deposit: {
    UNCONFIRMED: 'unconfirmed',
    CONFIRMED: 'completed',
  },
  withdrawal: {
    OPEN: 'open',
    COMPLETED: 'completed',
  },
  tradeOrder: {
    OPEN: 'open',
    FILLED: 'filled',
    CANCELLED: 'cancelled',
  },
  decimals: {
    EUR: 2,
    NLG: 8,
  },
};
