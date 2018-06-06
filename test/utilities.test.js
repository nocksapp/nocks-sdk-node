const chai = require('chai');

const { dateToString, positiveInteger, stringToFloat, floatToString } = require('../src/utilities');

const expect = chai.expect;

describe('dateToString', () => {
  it('converts date to string', () => {
    const date = new Date(801188580 * 1000);
    expect(dateToString(date)).to.be.equal('1995-05-23 02:23:00');
  });
});

describe('positiveInteger', () => {
  it('retreive integer value or default when not positive', () => {
    expect(positiveInteger(0.06382599)).to.be.equal(false);
    expect(positiveInteger(undefined)).to.be.equal(false);
    expect(positiveInteger(null)).to.be.equal(false);
    expect(positiveInteger('0')).to.be.equal(false);
    expect(positiveInteger(0)).to.be.equal(false);
    expect(positiveInteger(-1, 0)).to.be.equal(0);
    expect(positiveInteger(-2, -2)).to.be.equal(-2);
    expect(positiveInteger(2.2)).to.be.equal(2);
    expect(positiveInteger('20')).to.be.equal(20);
  });
});

describe('stringToFloat', () => {
  it('converts a string into a float', () => {
    expect(stringToFloat(0.06382599)).to.be.equal(0.06382599);
    expect(stringToFloat(undefined)).to.be.equal(0);
    expect(stringToFloat(null, -1)).to.be.equal(-1);
    expect(stringToFloat('0.06382599')).to.be.equal(0.06382599);
  });
});

describe('floatToString', () => {
  it('converts a float into a string', () => {
    expect(floatToString(0.06382599, 0)).to.be.equal('0');
    expect(floatToString(0.06382599, 2)).to.be.equal('0.06');
    expect(floatToString(0.06382599, 4)).to.be.equal('0.0638');
    expect(floatToString(0.06382599, 6)).to.be.equal('0.063826');
  });
});