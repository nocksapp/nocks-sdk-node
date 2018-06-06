const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const dateTransformerTransformStub = sinon.stub().returnsArg(0);
const dateTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const dateTransformer = { transform: dateTransformerTransformStub, reverseTransform: dateTransformerReverseTransformStub };

const MerchantProfileTransformer = proxyquire('./../../../src/api/transformers/MerchantProfile', {
  './Date': dateTransformer,
});

const expect = chai.expect;

afterEach(() => {
  dateTransformerTransformStub.resetHistory();
  dateTransformerReverseTransformStub.resetHistory();
});

describe('transform', () => {
  it('should transform a merchant profile', () => {
    const data = {
      uuid: 'ac7171d3-a912-411e-bd39-dfeb912b866c',
      name: 'Nocks B.V. - Location Groningen',
      is_active: true,
    };
    const result = MerchantProfileTransformer.transform(data);

    expect(result).to.be.deep.equal(data);

    sinon.assert.calledOnce(dateTransformerTransformStub);
    sinon.assert.notCalled(dateTransformerReverseTransformStub);
  });
});

describe('reverseTransform', () => {
  it('should reverse transform a merchant profile', () => {
    const data = {
      uuid: 'ac7171d3-a912-411e-bd39-dfeb912b866c',
      name: 'Nocks B.V. - Location Groningen',
      is_active: true,
    };
    const result = MerchantProfileTransformer.reverseTransform(data);

    expect(result).to.be.deep.equal(data);

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);
  });
});
