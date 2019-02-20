const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const dateTransformerTransformStub = sinon.stub().returnsArg(0);
const dateTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const dateTransformer = { transform: dateTransformerTransformStub, reverseTransform: dateTransformerReverseTransformStub };

const amountTransformerTransformStub = sinon.stub().returnsArg(0);
const amountTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const amountTransformer = { transform: amountTransformerTransformStub, reverseTransform: amountTransformerReverseTransformStub };

const paymentMethodTransformerTransformStub = sinon.stub().returnsArg(0);
const paymentMethodTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const paymentMethodTransformer = {
  transform: paymentMethodTransformerTransformStub,
  reverseTransform: paymentMethodTransformerReverseTransformStub,
};

const PaymentRefundTransformer = proxyquire('./../../../src/api/transformers/PaymentRefund', {
  './Date': dateTransformer,
  './Amount': amountTransformer,
  './PaymentMethod': paymentMethodTransformer,
});

const expect = chai.expect;

afterEach(() => {
  dateTransformerTransformStub.resetHistory();
  dateTransformerReverseTransformStub.resetHistory();

  amountTransformerTransformStub.resetHistory();
  amountTransformerReverseTransformStub.resetHistory();

  paymentMethodTransformerTransformStub.resetHistory();
  paymentMethodTransformerReverseTransformStub.resetHistory();
});

describe('transform', () => {
  it('should transform a payment refund', () => {
    const result = PaymentRefundTransformer.transform({
      uuid: 'f171d214-d712-4ae1-b5aa-2fec2b336b98',
      status: 'queued',
      type: 'refund',
      method_type: 'deposit',
      description: 'f171d214 Refund',
      metadata: {
        url: 'https://sandbox.nocks.com/payment/url/f171d214-d712-4ae1-b5aa-2fec2b336b98',
        address: 'TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM',
        transaction_reference: null,
      },
      created_at: {
        datetime: '2019-01-17 08:21:14',
        timestamp: 1547709674
      },
      updated_at: {
        datetime: '2019-01-17 08:21:14',
        timestamp: 1547709674
      },
      resource: 'payment',
      payable: {
        uuid: 'becfc454-a0bd-43da-ac63-40e12a2d802c',
        resource: 'payment'
      },
      amount: {
        amount: '100.0000',
        currency: 'NLG'
      },
      amount_refunded: {
        amount: '0.0000',
        currency: 'NLG'
      },
      payment_method: {
        data: {},
      },
    });

    expect(result).to.have.property('uuid').to.be.equal('f171d214-d712-4ae1-b5aa-2fec2b336b98');
    expect(result).to.have.property('status').to.be.equal('queued');
    expect(result).to.have.property('type').to.be.equal('refund');
    expect(result).to.have.property('method_type').to.be.equal('deposit');
    expect(result).to.have.property('description').to.be.equal('f171d214 Refund');
    expect(result).to.have.property('payment_method').to.be.deep.equal({});

    sinon.assert.calledOnce(dateTransformerTransformStub);
    sinon.assert.notCalled(dateTransformerReverseTransformStub);

    sinon.assert.calledOnce(amountTransformerTransformStub);
    sinon.assert.notCalled(amountTransformerReverseTransformStub);

    sinon.assert.calledOnce(paymentMethodTransformerTransformStub);
    sinon.assert.notCalled(paymentMethodTransformerReverseTransformStub);
  });
});

describe('reverseTransform', () => {
  it('should reverse transform a payment refund (not for request)', () => {
    const result = PaymentRefundTransformer.reverseTransform({
      refund_address: 'TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM',
      amount: {
        value: 10,
        currency: 'NLG',
      },
    });

    expect(result).to.be.deep.equal({
      refund_address: 'TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM',
      amount: {
        value: 10,
        currency: 'NLG',
      },
    });

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);

    sinon.assert.notCalled(amountTransformerTransformStub);
    sinon.assert.calledOnce(amountTransformerReverseTransformStub);
  });

  it('should reverse transform a payment refund for request', () => {
    const result = PaymentRefundTransformer.reverseTransform({
      refund_address: 'TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM',
      amount: {
        value: 10,
        currency: 'NLG',
      },
    }, { prepareForRequest: true });

    expect(result).to.be.deep.equal({
      refund_address: 'TRt152vKGMdYUZCQutSxaHs8fYcbnmKTRM',
      amount: {
        value: 10,
        currency: 'NLG',
      },
    });

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);

    sinon.assert.notCalled(amountTransformerTransformStub);
    sinon.assert.calledOnce(amountTransformerReverseTransformStub);
  });
});
