const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const dateTransformerTransformStub = sinon.stub().returnsArg(0);
const dateTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const dateTransformer = { transform: dateTransformerTransformStub, reverseTransform: dateTransformerReverseTransformStub };

const amountTransformerTransformStub = sinon.stub().returnsArg(0);
const amountTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const amountTransformerStub = { transform: amountTransformerTransformStub, reverseTransform: amountTransformerReverseTransformStub };

const merchantClearingTransformerTransformStub = sinon.stub().returnsArg(0);
const merchantClearingReverseTransformerTransformStub = sinon.stub().returnsArg(0);
const merchantClearingTransformer = { transform: merchantClearingTransformerTransformStub, reverseTransform: merchantClearingReverseTransformerTransformStub };

const MerchantInvoiceTransformer = proxyquire('./../../../src/api/transformers/MerchantInvoice', {
  './Date': dateTransformer,
  './Amount': amountTransformerStub,
  './MerchantClearing': merchantClearingTransformer
});

const expect = chai.expect;

afterEach(() => {
  dateTransformerTransformStub.resetHistory();
  dateTransformerReverseTransformStub.resetHistory();

  amountTransformerTransformStub.resetHistory();
  amountTransformerReverseTransformStub.resetHistory();

  merchantClearingTransformerTransformStub.resetHistory();
  merchantClearingReverseTransformerTransformStub.resetHistory();
});

describe('transform', () => {
  it('should transform a merchant invoice', () => {
    const result = MerchantInvoiceTransformer.transform({
      uuid: '53ee0868-89f7-4d2d-8648-0eb5534e7de9',
      reference: '2017-0001',
      status: 'expired',
      vat: '21',
      merchant_clearings: {
        data: [{}, {}, {}],
      },
    });

    expect(result).to.have.property('uuid').to.be.equal('53ee0868-89f7-4d2d-8648-0eb5534e7de9');
    expect(result).to.have.property('reference').to.be.equal('2017-0001');
    expect(result).to.have.property('status').to.be.equal('expired');
    expect(result).to.have.property('vat').to.be.equal('21');
    expect(result).to.have.property('merchant_clearings').to.be.deep.equal([{}, {}, {}]);
    expect(result).to.have.property('isOpen').to.be.a('function');
    expect(result).to.have.property('isPaid').to.be.a('function');
    expect(result).to.have.property('isExpired').to.be.a('function');

    expect(result.isOpen()).to.be.equal(false);
    expect(result.isPaid()).to.be.equal(false);
    expect(result.isExpired()).to.be.equal(true);

    sinon.assert.calledOnce(dateTransformerTransformStub);
    sinon.assert.notCalled(dateTransformerReverseTransformStub);

    sinon.assert.calledOnce(amountTransformerTransformStub);
    sinon.assert.notCalled(amountTransformerReverseTransformStub);

    sinon.assert.calledThrice(merchantClearingTransformerTransformStub);
    sinon.assert.notCalled(merchantClearingReverseTransformerTransformStub);
  });
});

describe('reverseTransform', () => {
  it('should reverse transform a merchant invoice (not for request)', () => {
    const result = MerchantInvoiceTransformer.reverseTransform({
      uuid: '53ee0868-89f7-4d2d-8648-0eb5534e7de9',
      reference: '2017-0001',
      vat: 21,
      merchant_clearings: [{}, {}, {}],
    });

    expect(result.merchant_clearings).to.be.deep.equal({
      data: [{}, {}, {}],
    });

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);

    sinon.assert.notCalled(amountTransformerTransformStub);
    sinon.assert.calledOnce(amountTransformerReverseTransformStub);

    sinon.assert.notCalled(merchantClearingTransformerTransformStub);
    sinon.assert.calledThrice(merchantClearingReverseTransformerTransformStub);
  });

  it('should reverse transform a merchant invoice for request', () => {
    const result = MerchantInvoiceTransformer.reverseTransform({
      uuid: '53ee0868-89f7-4d2d-8648-0eb5534e7de9',
      reference: '2017-0001',
      vat: '21',
      merchant_clearings: [{}, {}, {}],
    }, { prepareForRequest: true });

    expect(result.merchant_clearings).to.be.deep.equal([{}, {}, {}]);

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);

    sinon.assert.notCalled(amountTransformerTransformStub);
    sinon.assert.calledOnce(amountTransformerReverseTransformStub);

    sinon.assert.notCalled(merchantClearingTransformerTransformStub);
    sinon.assert.notCalled(merchantClearingReverseTransformerTransformStub);
  });
});
