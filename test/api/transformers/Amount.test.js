const chai = require('chai');
const AmountTransformer = require('./../../../src/api/transformers/Amount');

const expect = chai.expect;

describe('transform', () => {
  it('should transform amount fields', () => {
    const result = AmountTransformer.transform({
      target_amount: {
        amount: '1.0023',
        currency: 'NLG',
      },
      amount: {
        amount: '1.023',
        currency: 'EUR',
      },
      foo: {
        amount: '1.023',
        currency: 'EUR',
      },
      rate: '0.01635866',
      vat: '21',
    });

    expect(result).to.be.deep.equal({
      target_amount: {
        amount: '1.0023',
        value: 1.0023,
        currency: 'NLG',
      },
      amount: {
        amount: '1.023',
        value: 1.023,
        currency: 'EUR',
      },
      foo: {
        amount: '1.023',
        currency: 'EUR',
      },
      rate: 0.01635866,
      vat: 21,
    });
  });
});

describe('reverseTransform', () => {
  it('should reverse transform amount fields', () => {
    const result = AmountTransformer.reverseTransform({
      source_amount: {
        value: 0,
        currency: 'EUR',
      },
      target_amount: {
        amount: '1.0023',
        value: 1.0025,
        currency: 'NLG',
      },
      amount: {
        value: 1.023,
        currency: 'EUR',
      },
      foo: {
        amount: '1.023',
        currency: 'EUR',
      },
      rate: 0.01635866,
      vat: 21,
    });

    expect(result).to.be.deep.equal({
      source_amount: null,
      target_amount: {
        amount: '1.00250000',
        currency: 'NLG',
      },
      amount: {
        amount: '1.02',
        currency: 'EUR',
      },
      foo: {
        amount: '1.023',
        currency: 'EUR',
      },
      rate: '0.01635866',
      vat: '21.00000000',
    });
  });

  it('should throw an error at an unsupported currency', () => {
    const message = 'Unsupported currency "USD"';

    expect(() => AmountTransformer.reverseTransform({
      source_amount: {
        value: 0,
        currency: 'USD',
      },
      target_amount: {
        amount: '1.0023',
        value: 1.0025,
        currency: 'NLG',
      },
    })).to.throw(message);
  });
});
