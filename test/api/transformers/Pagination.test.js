const chai = require('chai');
const PaginationTransformer = require('./../../../src/api/transformers/Pagination');

const expect = chai.expect;

describe('transform', () => {
  it('should transform a pagination object with one page', () => {
    const result = PaginationTransformer.transform({
      total: 1,
      count: 1,
      per_page: 25,
      current_page: 1,
      total_pages: 1,
      links: [],
    });

    expect(result).to.have.property('total').to.be.equal(1);
    expect(result).to.have.property('count').to.be.equal(1);
    expect(result).to.have.property('per_page').to.be.equal(25);
    expect(result).to.have.property('current_page').to.be.equal(1);
    expect(result).to.have.property('total_pages').to.be.equal(1);
    expect(result).to.have.property('links').to.be.an('object').deep.equal({});
    expect(result).to.have.property('hasNext').to.be.a('function');
    expect(result).to.have.property('hasPrevious').to.be.a('function');
    expect(result).to.have.property('getNextPage').to.be.a('function');
    expect(result).to.have.property('getPreviousPage').to.be.a('function');

    expect(result.hasNext()).to.be.equal(false);
    expect(result.hasPrevious()).to.be.equal(false);
  });

  it('should transform a pagination object with multiple pages', () => {
    const result = PaginationTransformer.transform({
      total: 55,
      count: 25,
      per_page: 25,
      current_page: 2,
      total_pages: 3,
      links: {
        next: 'https://api.nocks.com/api/v2/transaction?page3',
        previous:  'https://api.nocks.com/api/v2/transaction?page1',
      },
    });

    expect(result).to.have.property('total').to.be.equal(55);
    expect(result).to.have.property('count').to.be.equal(25);
    expect(result).to.have.property('per_page').to.be.equal(25);
    expect(result).to.have.property('current_page').to.be.equal(2);
    expect(result).to.have.property('total_pages').to.be.equal(3);
    expect(result).to.have.property('links').to.be.an('object').deep.equal({
      next: 'https://api.nocks.com/api/v2/transaction?page3',
      previous:  'https://api.nocks.com/api/v2/transaction?page1',
    });
    expect(result).to.have.property('hasNext').to.be.a('function');
    expect(result).to.have.property('hasPrevious').to.be.a('function');
    expect(result).to.have.property('getNextPage').to.be.a('function');
    expect(result).to.have.property('getPreviousPage').to.be.a('function');

    expect(result.hasNext()).to.be.equal(true);
    expect(result.hasPrevious()).to.be.equal(true);
    expect(result.getNextPage()).to.be.equal(3);
    expect(result.getPreviousPage()).to.be.equal(1);
  });
});
