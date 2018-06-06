const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const dateTransformerTransformStub = sinon.stub().returnsArg(0);
const dateTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const dateTransformer = { transform: dateTransformerTransformStub, reverseTransform: dateTransformerReverseTransformStub };

const amountTransformerTransformStub = sinon.stub().returnsArg(0);
const amountTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const amountTransformer = { transform: amountTransformerTransformStub, reverseTransform: amountTransformerReverseTransformStub };

const MerchantClearingItemTransformer = proxyquire('./../../../src/api/transformers/MerchantClearingItem', {
  './Date': dateTransformer,
  './Amount': amountTransformer,
});

const expect = chai.expect;

afterEach(() => {
  dateTransformerTransformStub.resetHistory();
  dateTransformerReverseTransformStub.resetHistory();

  amountTransformerTransformStub.resetHistory();
  amountTransformerReverseTransformStub.resetHistory();
});

describe('transform', () => {
  it('should transform a merchant clearing item', () => {
    const data = {
      uuid: '7452d5e9-6467-4a09-8259-bedc7ddbc207',
      address: 'NL16ABNA0602167736',
      currency: 'EUR',
      status: 'paid',
      resource: 'merchant-clearing-item',
    };
    const result = MerchantClearingItemTransformer.transform(data);

    expect(result).to.have.property('uuid').to.be.equal('7452d5e9-6467-4a09-8259-bedc7ddbc207');
    expect(result).to.have.property('address').to.be.equal('NL16ABNA0602167736');
    expect(result).to.have.property('currency').to.be.equal('EUR');
    expect(result).to.have.property('status').to.be.equal('paid');
    expect(result).to.have.property('resource').to.be.equal('merchant-clearing-item');
    expect(result).to.have.property('isOpen').to.be.a('function');
    expect(result).to.have.property('isPaid').to.be.a('function');

    expect(result.isOpen()).to.be.equal(false);
    expect(result.isPaid()).to.be.equal(true);

    sinon.assert.calledOnce(dateTransformerTransformStub);
    sinon.assert.notCalled(dateTransformerReverseTransformStub);

    sinon.assert.calledOnce(amountTransformerTransformStub);
    sinon.assert.notCalled(amountTransformerReverseTransformStub);
  });
});

describe('reverseTransform', () => {
  it('should reverse transform a merchant clearing item', () => {
    const data = {
      uuid: '7452d5e9-6467-4a09-8259-bedc7ddbc207',
      address: 'NL16ABNA0602167736',
      currency: 'EUR',
      status: 'paid',
      resource: 'merchant-clearing-item',
    };
    const result = MerchantClearingItemTransformer.reverseTransform(data);

    expect(result).to.be.deep.equal(data);

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);

    sinon.assert.notCalled(amountTransformerTransformStub);
    sinon.assert.calledOnce(amountTransformerReverseTransformStub);
  });
});
