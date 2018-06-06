const scope = require('../scope');

const transaction = { uuid: '1fa1ff60-4280-4f34-b0eb-2a0671b44b2e' };

return scope.transactionPayment.cancel(transaction, { uuid: '9859bf10-4615-4bc4-92b0-3fd99d1c158a' });
