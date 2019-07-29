const chai = require('chai');
const sinon = require('sinon');
const proxyquire =  require('proxyquire');

const stub = sinon.stub();

const Request = proxyquire('../../src/helpers/request', {
  axios: {
    request: stub,
  }
});

const expect = chai.expect;

afterEach(() => {
  stub.reset();
});

describe('makeRequest', () => {
  it('should reject promise on invalid accessToken', (done) => {
    Request.makeRequest({ accessToken: '' })
      .then(() => {
        done(new Error('Expected "makeRequest" to reject'));
      })
      .catch((err) => {
        expect(err.message).to.be.equal('A valid "accessToken" is required for the request');
        sinon.assert.notCalled(stub);
        done();
      });
  });

  it('should reject promise on invalid twoFactorCode', (done) => {
    Request.makeRequest({ twoFactorCode: '' })
      .then(() => {
        done(new Error('Expected "makeRequest" to reject'));
      })
      .catch((err) => {
        sinon.assert.notCalled(stub);
        expect(err.message).to.be.equal('A valid "twoFactorCode" is required for the request');
        done();
      });
  });

  it('should merge config', (done) => {
    const config = { foo: 'bar', method: 'POST', headers: {} };
    stub.withArgs(sinon.match.any).throws(new Error('Expected stub to be called with different arguments'));
    stub.withArgs(sinon.match(config)).returns(Promise.resolve({ data: [] }));

    Request.makeRequest({ foo: 'bar', method: 'POST' })
      .then(() => {
        sinon.assert.calledOnce(stub);

        done();
      })
      .catch(done);
  });

  it('should return the data response', (done) => {
    stub.returns(Promise.resolve({
      data: {
        foo: ['bar']
      }
    }));

    Request.makeRequest({})
      .then((result) => {
        sinon.assert.calledOnce(stub);
        expect(result).to.be.an('object').to.deep.equal({ foo: ['bar'] });

        done();
      })
      .catch(done);
  });

  it('should return the response error', (done) => {
    const error = new Error('Error');
    error.response = { data: { status: 400, error: { code: 400, message: 'message' } } };
    stub.returns(Promise.reject(error));

    Request.makeRequest({})
      .then(() => {
        done(new Error('Expected "makeRequest" to reject'));
      })
      .catch((err) => {
        sinon.assert.calledOnce(stub);
        expect(err.status).to.be.equal(400);
        expect(err.code).to.be.equal(400);
        expect(err.message).to.be.equal('message');
        done();
      });
  });

  it('should return the request error', (done) => {
    const error = new Error('Request error');
    error.config = { method: 'post', url: 'test' };
    error.request = {};
    stub.returns(Promise.reject(error));

    Request.makeRequest({})
      .then(() => {
        done(new Error('Expected "makeRequest" to reject'));
      })
      .catch((err) => {
        sinon.assert.calledOnce(stub);
        expect(err.message).to.be.equal('No response received from the "post" request to test. Message: "Request error"');
        done();
      });
  });

  it('should return the error', (done) => {
    const error = new Error('Error');
    stub.returns(Promise.reject(error));

    Request.makeRequest({})
      .then(() => {
        done(new Error('Expected "makeRequest" to reject'));
      })
      .catch((err) => {
        sinon.assert.calledOnce(stub);
        expect(err.message).to.be.equal('Error');
        done();
      });
  });
});
