const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const dateTransformerTransformStub = sinon.stub().returnsArg(0);
const dateTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const dateTransformer = { transform: dateTransformerTransformStub, reverseTransform: dateTransformerReverseTransformStub };

const UserTransformer = proxyquire('./../../../src/api/transformers/User', {
  './Date': dateTransformer,
});

const expect = chai.expect;

afterEach(() => {
  dateTransformerTransformStub.resetHistory();
  dateTransformerReverseTransformStub.resetHistory();
});

describe('transform', () => {
  it('should transform a user', () => {
    const result = UserTransformer.transform({
      '2fa_enabled': false
    });

    expect(result).to.be.deep.equal({
      '2fa_enabled': false,
      is_enabled_two_factor: false,
    });

    sinon.assert.calledOnce(dateTransformerTransformStub);
    sinon.assert.notCalled(dateTransformerReverseTransformStub);
  });
});

describe('reverseTransform', () => {
  it('should reverseTransform a user', () => {
    const result = UserTransformer.reverseTransform({
      '2fa_enabled': false,
      is_enabled_two_factor: true,
    });

    expect(result).to.be.deep.equal({
      '2fa_enabled': true,
      is_enabled_two_factor: true,
    });

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);
  });
});
