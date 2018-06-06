const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const dateTransformerTransformStub = sinon.stub().returnsArg(0);
const dateTransformerReverseTransformStub = sinon.stub().returnsArg(0);
const dateTransformerStub = { transform: dateTransformerTransformStub, reverseTransform: dateTransformerReverseTransformStub };

const StatusTransitionTransformer = proxyquire('./../../../src/api/transformers/StatusTransition', {
  './Date': dateTransformerStub,
});

const expect = chai.expect;

afterEach(() => {
  dateTransformerTransformStub.resetHistory();
  dateTransformerReverseTransformStub.resetHistory();
});

describe('transform', () => {
  it('should transform a status transition', () => {
    const data = {
      status: 'open',
      resource: 'transaction-status-transition',
    };
    const result = StatusTransitionTransformer.transform(data);

    expect(result).to.be.deep.equal(data);

    sinon.assert.calledOnce(dateTransformerTransformStub);
    sinon.assert.notCalled(dateTransformerReverseTransformStub);
  });
});

describe('reverseTransform', () => {
  it('should reverse transform a status transition', () => {
    const data = {
      status: 'open',
      resource: 'transaction-status-transition',
    };
    const result = StatusTransitionTransformer.reverseTransform(data);

    expect(result).to.be.deep.equal(data);

    sinon.assert.notCalled(dateTransformerTransformStub);
    sinon.assert.calledOnce(dateTransformerReverseTransformStub);
  });
});
