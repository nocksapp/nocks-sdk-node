const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const dateTransformerTransformStub = sinon.stub().returnsArg(0);
const dateTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const dateTransformerStub = { transform: dateTransformerTransformStub, reverseTransform: dateTransformerReverseTransformStub };

const amountTransformerTransformStub = sinon.stub().returnsArg(0);
const amountTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const amountTransformerStub = { transform: amountTransformerTransformStub, reverseTransform: amountTransformerReverseTransformStub };

const paymentTransformerTransformStub = sinon.stub().returnsArg(0);
const paymentTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const paymentTransformerStub = { transform: paymentTransformerTransformStub, reverseTransform: paymentTransformerReverseTransformStub };

const statusTransitionTransformerTransformStub = sinon.stub().returnsArg(0);
const statusTransitionTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const statusTransitionTransformerStub = { transform: statusTransitionTransformerTransformStub, reverseTransform: statusTransitionTransformerReverseTransformStub };

const paymentMethodTransitionTransformerTransformStub = sinon.stub().returnsArg(0);
const paymentMethodTransitionTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const paymentMethodTransitionTransformerStub = { transform: paymentMethodTransitionTransformerTransformStub, reverseTransform: paymentMethodTransitionTransformerReverseTransformStub };

const TransactionTransformer = proxyquire('./../../../src/api/transformers/Transaction', {
  './Date': dateTransformerStub,
  './Amount': amountTransformerStub,
  './Payment': paymentTransformerStub,
  './StatusTransition': statusTransitionTransformerStub,
  './PaymentMethod': paymentMethodTransitionTransformerStub,
});

const expect = chai.expect;

afterEach(() => {
  dateTransformerTransformStub.resetHistory();
  dateTransformerReverseTransformStub.resetHistory();

  amountTransformerTransformStub.resetHistory();
  amountTransformerReverseTransformStub.resetHistory();

  paymentTransformerTransformStub.resetHistory();
  paymentTransformerReverseTransformStub.resetHistory();

  statusTransitionTransformerTransformStub.resetHistory();
  statusTransitionTransformerReverseTransformStub.resetHistory();

  paymentMethodTransitionTransformerTransformStub.resetHistory();
  paymentMethodTransitionTransformerReverseTransformStub.resetHistory();
});

describe('transform', () => {
  it('should transform a transaction', () => {
    const result = TransactionTransformer.transform({
      uuid: '7b1d4e3c-7bdf-4598-8537-031a731ee4d0',
      status: 'pending',
      payments: {
        data: [{}, {}],
      },
      status_transitions: {
        data: [{}, {}],
      },
      payment_method: {
        data: {},
      }
    });

    expect(result).to.have.property('uuid').to.be.equal('7b1d4e3c-7bdf-4598-8537-031a731ee4d0');
    expect(result).to.have.property('status').to.be.equal('pending');
    expect(result).to.have.property('payments').to.be.deep.equal([{}, {}]);
    expect(result).to.have.property('status_transitions').to.be.deep.equal([{}, {}]);

    expect(result).to.have.property('isOpen').to.be.a('function');
    expect(result).to.have.property('isPending').to.be.a('function');
    expect(result).to.have.property('isCancelled').to.be.a('function');
    expect(result).to.have.property('isPaid').to.be.a('function');
    expect(result).to.have.property('isExpired').to.be.a('function');
    expect(result).to.have.property('isRefunded').to.be.a('function');

    expect(result.isOpen()).to.be.equal(false);
    expect(result.isPending()).to.be.equal(true);
    expect(result.isCancelled()).to.be.equal(false);
    expect(result.isPaid()).to.be.equal(false);
    expect(result.isExpired()).to.be.equal(false);
    expect(result.isRefunded()).to.be.equal(false);

    sinon.assert.calledOnce(dateTransformerTransformStub);
    sinon.assert.notCalled(dateTransformerReverseTransformStub);

    sinon.assert.calledOnce(amountTransformerTransformStub);
    sinon.assert.notCalled(amountTransformerReverseTransformStub);

    sinon.assert.calledTwice(paymentTransformerTransformStub);
    sinon.assert.notCalled(paymentTransformerReverseTransformStub);

    sinon.assert.calledTwice(statusTransitionTransformerTransformStub);
    sinon.assert.notCalled(statusTransitionTransformerReverseTransformStub);

    sinon.assert.calledOnce(paymentMethodTransitionTransformerTransformStub);
    sinon.assert.notCalled(paymentMethodTransitionTransformerReverseTransformStub);
  });

  it('should transform a (socket) transaction', () => {
    const result = TransactionTransformer.transform({
      uuid: '7b1d4e3c-7bdf-4598-8537-031a731ee4d0',
      status: 'pending',
    });

    expect(result).to.have.property('uuid').to.be.equal('7b1d4e3c-7bdf-4598-8537-031a731ee4d0');
    expect(result).to.have.property('status').to.be.equal('pending');
    expect(result).to.have.property('payments').to.be.deep.equal(undefined);
    expect(result).to.have.property('status_transitions').to.be.deep.equal(undefined);

    expect(result).to.have.property('isOpen').to.be.a('function');
    expect(result).to.have.property('isPending').to.be.a('function');
    expect(result).to.have.property('isCancelled').to.be.a('function');
    expect(result).to.have.property('isPaid').to.be.a('function');
    expect(result).to.have.property('isExpired').to.be.a('function');
    expect(result).to.have.property('isRefunded').to.be.a('function');

    expect(result.isOpen()).to.be.equal(false);
    expect(result.isPending()).to.be.equal(true);
    expect(result.isCancelled()).to.be.equal(false);
    expect(result.isPaid()).to.be.equal(false);
    expect(result.isExpired()).to.be.equal(false);
    expect(result.isRefunded()).to.be.equal(false);

    sinon.assert.calledOnce(dateTransformerTransformStub);
    sinon.assert.notCalled(dateTransformerReverseTransformStub);

    sinon.assert.calledOnce(amountTransformerTransformStub);
    sinon.assert.notCalled(amountTransformerReverseTransformStub);

    sinon.assert.notCalled(paymentTransformerTransformStub);
    sinon.assert.notCalled(paymentTransformerReverseTransformStub);

    sinon.assert.notCalled(statusTransitionTransformerTransformStub);
    sinon.assert.notCalled(statusTransitionTransformerReverseTransformStub);

    sinon.assert.notCalled(paymentMethodTransitionTransformerTransformStub);
    sinon.assert.notCalled(paymentMethodTransitionTransformerReverseTransformStub);
  });
});

describe('reverseTransform', () => {
  it('should reverse transform a transaction (not for request)', () => {
    const result = TransactionTransformer.reverseTransform({
      uuid: '7b1d4e3c-7bdf-4598-8537-031a731ee4d0',
      status: 'pending',
      payments: [{}, {}],
      status_transitions: [{}, {}],
      payment_method: {},
    });

    expect(result).to.be.deep.equal({
      uuid: '7b1d4e3c-7bdf-4598-8537-031a731ee4d0',
      status: 'pending',
      payments: { data: [{}, {}] },
      status_transitions: { data: [{}, {}] },
      payment_method: { data: {} },
    });

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);

    sinon.assert.notCalled(amountTransformerTransformStub);
    sinon.assert.calledOnce(amountTransformerReverseTransformStub);

    sinon.assert.notCalled(paymentTransformerTransformStub);
    sinon.assert.calledTwice(paymentTransformerReverseTransformStub);

    sinon.assert.notCalled(statusTransitionTransformerTransformStub);
    sinon.assert.calledTwice(statusTransitionTransformerReverseTransformStub);

    sinon.assert.notCalled(paymentMethodTransitionTransformerTransformStub);
    sinon.assert.calledOnce(paymentMethodTransitionTransformerReverseTransformStub);
  });

  it('should reverse transform a transaction for request', () => {
    const result = TransactionTransformer.reverseTransform({
      uuid: '7b1d4e3c-7bdf-4598-8537-031a731ee4d0',
      status: 'pending',
      payments: [{}, {}],
      status_transitions: [{}, {}],
      payment_method: {},
    }, { prepareForRequest: true });

    expect(result).to.be.deep.equal({
      uuid: '7b1d4e3c-7bdf-4598-8537-031a731ee4d0',
      status: 'pending',
      payments: [{}, {}],
      status_transitions: [{}, {}],
      payment_method: {},
    });

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);

    sinon.assert.notCalled(amountTransformerTransformStub);
    sinon.assert.calledOnce(amountTransformerReverseTransformStub);

    sinon.assert.notCalled(paymentTransformerTransformStub);
    sinon.assert.notCalled(paymentTransformerReverseTransformStub);

    sinon.assert.notCalled(statusTransitionTransformerTransformStub);
    sinon.assert.notCalled(statusTransitionTransformerReverseTransformStub);

    sinon.assert.notCalled(paymentMethodTransitionTransformerTransformStub);
    sinon.assert.notCalled(paymentMethodTransitionTransformerReverseTransformStub);
  });
});
