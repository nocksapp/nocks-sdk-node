const chai = require('chai');

const { isValidRequiredString, isNotEmptyArray } = require('../../src/helpers/validation');

const expect = chai.expect;

describe('isValidRequiredString', () => {
  it('should validate strings', () => {
    expect(isValidRequiredString(undefined)).to.be.equal(false);
    expect(isValidRequiredString(null)).to.be.equal(false);
    expect(isValidRequiredString(1234)).to.be.equal(false);
    expect(isValidRequiredString('')).to.be.equal(false);
    expect(isValidRequiredString('    ')).to.be.equal(false);
    expect(isValidRequiredString('foo')).to.be.equal(true);
  });
});

describe('isNotEmptyArray', () => {
  it('should validate arrays', () => {
    expect(isNotEmptyArray(undefined)).to.be.equal(false);
    expect(isNotEmptyArray(null)).to.be.equal(false);
    expect(isNotEmptyArray([])).to.be.equal(false);
    expect(isNotEmptyArray(['foo'])).to.be.equal(true);
  });
});
