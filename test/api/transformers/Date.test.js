const chai = require('chai');
const DateTransformer = require('./../../../src/api/transformers/Date');

const expect = chai.expect;

describe('transform', () => {
  it('should transform date fields', () => {
    const result = DateTransformer.transform({
      created_at: {
        datetime: '2017-06-28 13:57:02',
        timestamp: 1498658222
      },
      updated_at: {
        datetime: '',
        timestamp: null,
      },
      date_start: '2017-06-30',
      date_end: '',
      foo: '2017-06-19 08:44:25',
    });

    expect(result).to.be.deep.equal({
      created_at: new Date(1498658222 * 1000),
      updated_at: null,
      date_start: new Date('2017-06-30'),
      date_end: null,
      foo: '2017-06-19 08:44:25',
    });
  });
});

describe('reverseTransform', () => {
  it('should reverse transform date fields (not for request)', () => {
    const result = DateTransformer.reverseTransform({
      created_at: new Date(1498658222 * 1000),
      date_start: new Date('2017-06-30'),
      foo: '2017-06-19 08:44:25',
    });

    expect(result).to.be.deep.equal({
      created_at: {
        datetime: '2017-06-28 15:57:02',
        timestamp: 1498658222
      },
      date_start: '2017-06-30',
      foo: '2017-06-19 08:44:25',
    });
  });

  it('should reverse transform date fields for request', () => {
    const result = DateTransformer.reverseTransform({
      created_at: new Date(1498658222 * 1000),
      date_start: new Date('2017-06-30'),
      foo: '2017-06-19 08:44:25',
    }, { prepareForRequest: true });

    expect(result).to.be.deep.equal({
      created_at: '2017-06-28 15:57:02',
      date_start: '2017-06-30',
      foo: '2017-06-19 08:44:25',
    });
  });
});
