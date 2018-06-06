const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const amountTransformerTransformStub = sinon.stub().returnsArg(0);
const amountTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const amountTransformer = { transform: amountTransformerTransformStub, reverseTransform: amountTransformerReverseTransformStub };

const TransactionQuoteTransformer = proxyquire('./../../../src/api/transformers/TransactionQuote', {
  './Amount': amountTransformer,
});

const expect = chai.expect;

afterEach(() => {
  amountTransformerTransformStub.resetHistory();
  amountTransformerReverseTransformStub.resetHistory();
});

describe('transform', () => {
  it('should transform a transaction quote', () => {
    const data = { foo: 'bar' };
    const result = TransactionQuoteTransformer.transform(data);

    expect(result).to.be.deep.equal(data);

    sinon.assert.calledOnce(amountTransformerTransformStub);
    sinon.assert.notCalled(amountTransformerReverseTransformStub);
  });
});
