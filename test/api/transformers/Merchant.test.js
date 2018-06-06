const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const dateTransformerTransformStub = sinon.stub().returnsArg(0);
const dateTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const dateTransformer = { transform: dateTransformerTransformStub, reverseTransform: dateTransformerReverseTransformStub };

const merchantProfileTransformerTransformStub = sinon.stub().returnsArg(0);
const merchantProfileTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const merchantProfileTransformer = { transform: merchantProfileTransformerTransformStub, reverseTransform: merchantProfileTransformerReverseTransformStub };

const merchantClearingDistributionTransformerTransformStub = sinon.stub().returnsArg(0);
const merchantClearingDistributionTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const merchantClearingDistributionTransformer = { transform: merchantClearingDistributionTransformerTransformStub, reverseTransform: merchantClearingDistributionTransformerReverseTransformStub };

const merchantClearingStub = sinon.stub();
const merchantClearingFindStub = sinon.stub();
const merchantClearingFindOneStub = sinon.stub();
merchantClearingStub.returns({ find: merchantClearingFindStub, findOne: merchantClearingFindOneStub });

const merchantProfileStub = sinon.stub();
const merchantProfileCreateStub = sinon.stub();
const merchantProlileFindStub = sinon.stub();
const merchantProfileFindOneStub = sinon.stub();
const merchantProfileDeleteStub = sinon.stub();
merchantProfileStub.returns({ create: merchantProfileCreateStub, find: merchantProlileFindStub, findOne: merchantProfileFindOneStub, delete: merchantProfileDeleteStub });

const merchantInvoiceStub = sinon.stub();
const merchantInvoiceFindStub = sinon.stub();
const merchantInvoiceFindOneStub = sinon.stub();
merchantInvoiceStub.returns({ find: merchantInvoiceFindStub, findOne: merchantInvoiceFindOneStub });

const MerchantTransformer = proxyquire('./../../../src/api/transformers/Merchant', {
  './Date': dateTransformer,
  './MerchantProfile': merchantProfileTransformer,
  './MerchantClearingDistribution': merchantClearingDistributionTransformer,

  './../MerchantClearing': merchantClearingStub,
  './../MerchantProfile': merchantProfileStub,
  './../MerchantInvoice': merchantInvoiceStub,
});

const expect = chai.expect;

afterEach(() => {
  dateTransformerTransformStub.resetHistory();
  dateTransformerReverseTransformStub.resetHistory();

  merchantProfileTransformerTransformStub.resetHistory();
  merchantProfileTransformerReverseTransformStub.resetHistory();

  merchantClearingDistributionTransformerTransformStub.resetHistory();
  merchantClearingDistributionTransformerReverseTransformStub.resetHistory();

  merchantClearingFindStub.resetHistory();
  merchantClearingFindOneStub.resetHistory();

  merchantProfileCreateStub.resetHistory();
  merchantProlileFindStub.resetHistory();
  merchantProfileFindOneStub.resetHistory();
  merchantProfileDeleteStub.resetHistory();

  merchantInvoiceFindStub.resetHistory();
  merchantInvoiceFindOneStub.resetHistory();
});

describe('transform', () => {
  it('should transform a merchant', () => {
    const result = MerchantTransformer.transform({
      uuid: '85468de6-3875-4968-9259-2399ca7b207e',
      name: 'Nocks B.V.',
      clearing_distribution: {
        data: [{}, {}],
      },
      merchant_profiles: {
        data: [{}, {}],
      }
    });

    expect(result).to.have.property('uuid').to.be.equal('85468de6-3875-4968-9259-2399ca7b207e');
    expect(result).to.have.property('name').to.be.equal('Nocks B.V.');
    expect(result).to.have.property('clearing_distribution').to.be.deep.equal([{}, {}]);
    expect(result).to.have.property('merchant_profiles').to.be.deep.equal([{}, {}]);

    expect(result).to.have.property('findClearing').to.be.a('function');
    expect(result).to.have.property('findClearings').to.be.a('function');
    expect(result).to.have.property('createProfile').to.be.a('function');
    expect(result).to.have.property('findProfile').to.be.a('function');
    expect(result).to.have.property('findProfiles').to.be.a('function');
    expect(result).to.have.property('deleteProfile').to.be.a('function');
    expect(result).to.have.property('findInvoice').to.be.a('function');
    expect(result).to.have.property('findInvoices').to.be.a('function');

    result.findClearing({ uuid: '1' });
    result.findClearings();
    result.createProfile({});
    result.findProfile({ uuid: '1' });
    result.findProfiles();
    result.deleteProfile({ uuid: '1' });
    result.findInvoice({ uuid: '1' });
    result.findInvoices();

    sinon.assert.calledOnce(merchantClearingFindOneStub);
    sinon.assert.calledOnce(merchantClearingFindStub);
    sinon.assert.calledOnce(merchantProfileCreateStub);
    sinon.assert.calledOnce(merchantProfileFindOneStub);
    sinon.assert.calledOnce(merchantProlileFindStub);
    sinon.assert.calledOnce(merchantProfileDeleteStub);
    sinon.assert.calledOnce(merchantInvoiceFindOneStub);
    sinon.assert.calledOnce(merchantInvoiceFindStub);

    sinon.assert.calledOnce(dateTransformerTransformStub);
    sinon.assert.notCalled(dateTransformerReverseTransformStub);

    sinon.assert.calledTwice(merchantProfileTransformerTransformStub);
    sinon.assert.notCalled(merchantProfileTransformerReverseTransformStub);

    sinon.assert.calledTwice(merchantClearingDistributionTransformerTransformStub);
    sinon.assert.notCalled(merchantClearingDistributionTransformerReverseTransformStub);
  });
});

describe('reverseTransform', () => {
  it('should reverse transform a merchant (not for request)', () => {
    const result = MerchantTransformer.reverseTransform({
      uuid: '85468de6-3875-4968-9259-2399ca7b207e',
      name: 'Nocks B.V.',
      clearing_distribution: [{}, {}],
      merchant_profiles: [{}, {}],
    });

    expect(result.clearing_distribution).to.be.deep.equal({
      data: [{}, {}],
    });

    expect(result.merchant_profiles).to.be.deep.equal({
      data: [{}, {}],
    });

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);

    sinon.assert.notCalled(merchantProfileTransformerTransformStub);
    sinon.assert.calledTwice(merchantProfileTransformerReverseTransformStub);

    sinon.assert.notCalled(merchantClearingDistributionTransformerTransformStub);
    sinon.assert.calledTwice(merchantClearingDistributionTransformerReverseTransformStub);
  });

  it('should reverse transform a merchant for request', () => {
    const result = MerchantTransformer.reverseTransform({
      uuid: '85468de6-3875-4968-9259-2399ca7b207e',
      name: 'Nocks B.V.',
      clearing_distribution: [{}, {}],
      merchant_profiles: [{}, {}],
    }, { prepareForRequest: true });

    expect(result.clearing_distribution).to.be.deep.equal([{}, {}]);
    expect(result.merchant_profiles).to.be.deep.equal([{}, {}]);

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);

    sinon.assert.notCalled(merchantProfileTransformerTransformStub);
    sinon.assert.notCalled(merchantProfileTransformerReverseTransformStub);

    sinon.assert.notCalled(merchantClearingDistributionTransformerTransformStub);
    sinon.assert.notCalled(merchantClearingDistributionTransformerReverseTransformStub);
  });
});
