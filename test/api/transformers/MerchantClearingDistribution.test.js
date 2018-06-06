const chai = require('chai');
const proxyquire = require('proxyquire');

const MerchantClearingDistributionTransformer = proxyquire('./../../../src/api/transformers/MerchantClearingDistribution', {});

const expect = chai.expect;

describe('transform', () => {
  it('should transform a merchant clearing distribution', () => {
    const data = {
      percentage: 80,
      address: 'NL16ABNA0602167736',
      currency: 'EUR'
    };

    const result = MerchantClearingDistributionTransformer.transform(data);

    expect(result).to.be.deep.equal(data);
  });
});

describe('reverseTransform', () => {
  it('should reverse transform a merchant clearing distribution', () => {
    const data = {
      percentage: 80,
      address: 'NL16ABNA0602167736',
      currency: 'EUR'
    };

    const result = MerchantClearingDistributionTransformer.reverseTransform(data);

    expect(result).to.be.deep.equal(data);
  });
});
