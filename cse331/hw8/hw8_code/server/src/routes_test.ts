import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { Dummy, listFile, loadFile, saveFile } from './routes';


describe('routes', function() {

  // After you know what to do, feel free to delete this Dummy test
  it('Dummy', function() {
    // Feel free to copy this test structure to start your own tests, but look at these
    // comments first to understand what's going on.

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req1 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'GET', url: '/api/dummy', query: {name: 'Kevin'}}); 
    const res1 = httpMocks.createResponse();

    // call our function to execute the request and fill in the response
    Dummy(req1, res1);

    // check that the request was successful
    assert.strictEqual(res1._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepEqual(res1._getJSONData(), 'Hi, Kevin');
  });


  // TODO: add tests for your routes
  it('saveFile', function() {
    const req1 = httpMocks.createRequest(
        {method: 'POST', url: '/api/save', query: {name: 'Kevin'}, body: {content: 'Hello'}}); 
    const res1 = httpMocks.createResponse();
    saveFile(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);

    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/save', query: {name: 'foo'}, body: {content: 'Hello Foo'}}); 
    const res2 = httpMocks.createResponse();
    saveFile(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);

    const req3 = httpMocks.createRequest(
        {method: 'POST', url: '/api/save', query: {name: 'bar'}, body: {content: 'Hello Bar'}}); 
    const res3 = httpMocks.createResponse();
    saveFile(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
  });

  it('loadFile', function() {
    const req1 = httpMocks.createRequest(
        {method: 'GET', url: '/api/load', query: {name: 'Kevin'}}); 
    const res1 = httpMocks.createResponse();
    loadFile(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);

    const req2 = httpMocks.createRequest(
        {method: 'GET', url: '/api/load', query: {name: 'foo'}}); 
    const res2 = httpMocks.createResponse();
    loadFile(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);

    const req3 = httpMocks.createRequest(
        {method: 'GET', url: '/api/load', query: {name: 'bar'}}); 
    const res3 = httpMocks.createResponse();
    loadFile(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
  });

  it('listFile', function() {
    const req1 = httpMocks.createRequest(
        {method: 'GET', url: '/api/list', query: {}}); 
    const res1 = httpMocks.createResponse();
    listFile(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getData(), {names: ['Kevin', 'foo', 'bar']});  
  });

});
