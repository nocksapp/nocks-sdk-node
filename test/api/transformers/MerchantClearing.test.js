const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const dateTransformerTransformStub = sinon.stub().returnsArg(0);
const dateTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const dateTransformer = { transform: dateTransformerTransformStub, reverseTransform: dateTransformerReverseTransformStub };

const amountTransformerTransformStub = sinon.stub().returnsArg(0);
const amountTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const amountTransformer = { transform: amountTransformerTransformStub, reverseTransform: amountTransformerReverseTransformStub };

const merchantClearingItemTransformerTransformStub = sinon.stub().returnsArg(0);
const merchantClearingItemTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const merchantClearingItemTransformer = { transform: merchantClearingItemTransformerTransformStub, reverseTransform: merchantClearingItemTransformerReverseTransformStub };

const MerchantClearingTransformer = proxyquire('./../../../src/api/transformers/MerchantClearing', {
  './Date': dateTransformer,
  './Amount': amountTransformer,
  './MerchantClearingItem': merchantClearingItemTransformer
});

const expect = chai.expect;

afterEach(() => {
  dateTransformerTransformStub.resetHistory();
  dateTransformerReverseTransformStub.resetHistory();

  amountTransformerTransformStub.resetHistory();
  amountTransformerReverseTransformStub.resetHistory();

  merchantClearingItemTransformerTransformStub.resetHistory();
  merchantClearingItemTransformerReverseTransformStub.resetHistory();
});

describe('transform', () => {
  it('should transform a merchant clearing', () => {
    const result = MerchantClearingTransformer.transform({
      uuid: '467014b2-7833-4083-bb38-fa7e17011ff6',
      reference: 'CLEARING-20170615-7953b9',
      status: 'open',
      merchant_clearing_items: {
        data: [{}, {}],
      },
    });

    expect(result).to.have.property('uuid').to.be.equal('467014b2-7833-4083-bb38-fa7e17011ff6');
    expect(result).to.have.property('reference').to.be.equal('CLEARING-20170615-7953b9');
    expect(result).to.have.property('status').to.be.equal('open');
    expect(result).to.have.property('merchant_clearing_items').to.be.deep.equal([{}, {}]);

    expect(result).to.have.property('isOpen').to.be.a('function');
    expect(result).to.have.property('isPaid').to.be.a('function');

    expect(result.isOpen()).to.be.equal(true);
    expect(result.isPaid()).to.be.equal(false);

    sinon.assert.calledOnce(dateTransformerTransformStub);
    sinon.assert.notCalled(dateTransformerReverseTransformStub);

    sinon.assert.calledOnce(amountTransformerTransformStub);
    sinon.assert.notCalled(amountTransformerReverseTransformStub);

    sinon.assert.calledTwice(merchantClearingItemTransformerTransformStub);
    sinon.assert.notCalled(merchantClearingItemTransformerReverseTransformStub);
  });
});

describe('reverseTransform', () => {
  it('should reverse transform a merchant clearing (not for request)', () => {
    const result = MerchantClearingTransformer.reverseTransform({
      uuid: '467014b2-7833-4083-bb38-fa7e17011ff6',
      reference: 'CLEARING-20170615-7953b9',
      merchant_clearing_items: [{}, {}]
    });

    expect(result.merchant_clearing_items).to.be.deep.equal({
      data: [{}, {}],
    });

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);

    sinon.assert.notCalled(amountTransformerTransformStub);
    sinon.assert.calledOnce(amountTransformerReverseTransformStub);

    sinon.assert.notCalled(merchantClearingItemTransformerTransformStub);
    sinon.assert.calledTwice(merchantClearingItemTransformerReverseTransformStub);
  });

  it('should reverse transform a merchant clearing for request', () => {
    const result = MerchantClearingTransformer.reverseTransform({
      uuid: '467014b2-7833-4083-bb38-fa7e17011ff6',
      reference: 'CLEARING-20170615-7953b9',
      merchant_clearing_items: [{}, {}]
    }, { prepareForRequest: true });

    expect(result.merchant_clearing_items).to.be.deep.equal([{}, {}]);

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);

    sinon.assert.notCalled(amountTransformerTransformStub);
    sinon.assert.calledOnce(amountTransformerReverseTransformStub);

    sinon.assert.notCalled(merchantClearingItemTransformerTransformStub);
    sinon.assert.notCalled(merchantClearingItemTransformerReverseTransformStub);
  });
});
