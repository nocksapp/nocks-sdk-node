const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const dateTransformerTransformStub = sinon.stub().returnsArg(0);
const dateTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const dateTransformer = { transform: dateTransformerTransformStub, reverseTransform: dateTransformerReverseTransformStub };

const amountTransformerTransformStub = sinon.stub().returnsArg(0);
const amountTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const amountTransformer = { transform: amountTransformerTransformStub, reverseTransform: amountTransformerReverseTransformStub };

const PaymentTransformer = proxyquire('./../../../src/api/transformers/Payment', {
  './Date': dateTransformer,
  './Amount': amountTransformer
});

const expect = chai.expect;

afterEach(() => {
  dateTransformerTransformStub.resetHistory();
  dateTransformerReverseTransformStub.resetHistory();

  amountTransformerTransformStub.resetHistory();
  amountTransformerReverseTransformStub.resetHistory();
});

describe('transform', () => {
  it('should transform a payment', () => {
    const result = PaymentTransformer.transform({
      uuid: 'cf746fc8-c162-4b79-b981-6266f02f86c8',
      status: 'pending',
      type: 'transaction-source',
      method_type: 'redirect',
      description: 'cf746fc8 Transaction',
      payment_method: {
        data: {}
      },
    });

    expect(result).to.have.property('uuid').to.be.equal('cf746fc8-c162-4b79-b981-6266f02f86c8');
    expect(result).to.have.property('status').to.be.equal('pending');
    expect(result).to.have.property('type').to.be.equal('transaction-source');
    expect(result).to.have.property('method_type').to.be.equal('redirect');
    expect(result).to.have.property('description').to.be.equal('cf746fc8 Transaction');
    expect(result).to.have.property('payment_method').to.be.deep.equal({});

    expect(result).to.have.property('isCancelled').to.be.a('function');
    expect(result).to.have.property('isExpired').to.be.a('function');
    expect(result).to.have.property('isOpen').to.be.a('function');
    expect(result).to.have.property('isPaid').to.be.a('function');
    expect(result).to.have.property('isPending').to.be.a('function');

    expect(result.isCancelled()).to.be.equal(false);
    expect(result.isExpired()).to.be.equal(false);
    expect(result.isOpen()).to.be.equal(false);
    expect(result.isPaid()).to.be.equal(false);
    expect(result.isPending()).to.be.equal(true);

    sinon.assert.calledOnce(dateTransformerTransformStub);
    sinon.assert.notCalled(dateTransformerReverseTransformStub);

    sinon.assert.calledOnce(amountTransformerTransformStub);
    sinon.assert.notCalled(amountTransformerReverseTransformStub);
  });
});

describe('reverseTransform', () => {
  it('should reverse transform a payment (not for request)', () => {
    const result = PaymentTransformer.reverseTransform({
      uuid: 'cf746fc8-c162-4b79-b981-6266f02f86c8',
      status: 'pending',
      type: 'transaction-source',
      method_type: 'redirect',
      description: 'cf746fc8 Transaction',
      payment_method: {},
    });

    expect(result).to.be.deep.equal({
      uuid: 'cf746fc8-c162-4b79-b981-6266f02f86c8',
      status: 'pending',
      type: 'transaction-source',
      method_type: 'redirect',
      description: 'cf746fc8 Transaction',
      payment_method: {
        data: {},
      },
    });

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);

    sinon.assert.notCalled(amountTransformerTransformStub);
    sinon.assert.calledOnce(amountTransformerReverseTransformStub);
  });

  it('should reverse transform a payment for request', () => {
    const result = PaymentTransformer.reverseTransform({
      uuid: 'cf746fc8-c162-4b79-b981-6266f02f86c8',
      status: 'pending',
      type: 'transaction-source',
      method_type: 'redirect',
      description: 'cf746fc8 Transaction',
      payment_method: {},
    }, { prepareForRequest: true });

    expect(result).to.be.deep.equal({
      uuid: 'cf746fc8-c162-4b79-b981-6266f02f86c8',
      status: 'pending',
      type: 'transaction-source',
      method_type: 'redirect',
      description: 'cf746fc8 Transaction',
      payment_method: {},
    });

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);

    sinon.assert.notCalled(amountTransformerTransformStub);
    sinon.assert.calledOnce(amountTransformerReverseTransformStub);
  });
});
