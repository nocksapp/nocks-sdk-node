const DateTransformer = require('./Date');
const AmountTransformer = require('./Amount');
const TransactionTransformer = require('./Transaction');

/**
 * Transform
 */
const transform = ({ platform }) => (bill) => AmountTransformer.transform(DateTransformer.transform(Object.assign({}, bill, {
  // Transform transaction
  transactions: bill.transactions.data.map(TransactionTransformer.transform),
  url: `${platform.web}/payment-request/${bill.uuid}`,
})));

/**
 * Reverse transform
 *
 * @param bill
 * @param prepareForRequest
 */
const reverseTransform = (bill, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  // Reverse transactions
  if (bill.transactions && !prepareForRequest) {
    reverseObject.transactions = {
      data: TransactionTransformer.reverseTransform(bill.transaction, { prepareForRequest }),
    };
  }

  return AmountTransformer.reverseTransform(DateTransformer.reverseTransform(Object.assign({}, bill, reverseObject)));
};

module.exports = {
  transform,
  reverseTransform,
};
