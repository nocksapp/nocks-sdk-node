const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const amountTransformerTransformStub = sinon.stub().returnsArg(0);
const amountTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const amountTransformer = { transform: amountTransformerTransformStub, reverseTransform: amountTransformerReverseTransformStub };

const paymentMethodTransformerTransformStub = sinon.stub().returnsArg(0);
const paymentMethodTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const paymentMethodTransformer = {
  transform: paymentMethodTransformerTransformStub,
  reverseTransform: paymentMethodTransformerReverseTransformStub,
};

const BalanceCurrencyTransformer = proxyquire('./../../../src/api/transformers/BalanceCurrency', {
  './Amount': amountTransformer,
  './PaymentMethod': paymentMethodTransformer,
});

const expect = chai.expect;

afterEach(() => {
  amountTransformerTransformStub.resetHistory();
  amountTransformerReverseTransformStub.resetHistory();

  paymentMethodTransformerTransformStub.resetHistory();
  paymentMethodTransformerReverseTransformStub.resetHistory();
});

describe('transform', () => {
  it('should transform a balance currency', () => {
    const result = BalanceCurrencyTransformer.transform({
      code: 'EUR',
      deposit_payment_methods: {
        data: [{}, {}],
      },
      withdrawal_payment_methods: {
        data: [{}],
      },
    });

    expect(result).to.have.property('code').to.be.equal('EUR');

    sinon.assert.calledOnce(amountTransformerTransformStub);
    sinon.assert.notCalled(amountTransformerReverseTransformStub);

    sinon.assert.calledThrice(paymentMethodTransformerTransformStub);
    sinon.assert.notCalled(paymentMethodTransformerReverseTransformStub);
  });
});

describe('reverseTransform', () => {
  it('should reverse transform a balance currency (not for request)', () => {
    const result = BalanceCurrencyTransformer.reverseTransform({
      code: 'EUR',
      deposit_payment_methods: [{}],
      withdrawal_payment_methods: [{}],
    });

    expect(result).to.have.property('code').to.be.equal('EUR');

    sinon.assert.notCalled(amountTransformerTransformStub);
    sinon.assert.calledOnce(amountTransformerReverseTransformStub);

    sinon.assert.notCalled(paymentMethodTransformerTransformStub);
    sinon.assert.calledTwice(paymentMethodTransformerReverseTransformStub);
  });

  it('should reverse transform a balance currency for request', () => {
    const result = BalanceCurrencyTransformer.reverseTransform({
      code: 'EUR',
      deposit_payment_methods: [{}],
      withdrawal_payment_methods: [{}],
    }, { prepareForRequest: true });

    expect(result).to.have.property('code').to.be.equal('EUR');

    sinon.assert.notCalled(amountTransformerTransformStub);
    sinon.assert.calledOnce(amountTransformerReverseTransformStub);

    sinon.assert.notCalled(paymentMethodTransformerTransformStub);
    sinon.assert.notCalled(paymentMethodTransformerReverseTransformStub);
  });
});
