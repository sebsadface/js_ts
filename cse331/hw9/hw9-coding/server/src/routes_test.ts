import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { createDraft, listDraft, pickInDraft } from './routes';


describe('routes', function() {

  // it('Dummy', function() {
  //   const req1 = httpMocks.createRequest(
  //       {method: 'GET', url: '/api/dummy', query: {name: 'Kevin'}});
  //   const res1 = httpMocks.createResponse();
  //   Dummy(req1, res1);
  //   assert.strictEqual(res1._getStatusCode(), 200);
  //   assert.deepEqual(res1._getJSONData(), 'Hi, Kevin');
  // });

  it('createDraft', function() {
    const req1 = httpMocks.createRequest(
        {method: 'POST', url: '/api/create', query: {rounds: "2"},  body: {drafters: 'Kevin\nAlice\nLisa', options: 'A\nB\nC'}});
    const res1 = httpMocks.createResponse();
    createDraft(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getData(), {id: 0, rounds: 2, drafters: ['Kevin', 'Alice', 'Lisa'], options: ['A', 'B', 'C'], picks: []});

    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/create', query: {rounds: "100"},  body: {drafters: 'Bob\nSam\nPeople', options: 'this\nthat\nwhat'}});
    const res2 = httpMocks.createResponse();
    createDraft(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepEqual(res2._getData(), {id: 1, rounds: 100, drafters: ['Bob', 'Sam', 'People'], options: ['this', 'that', 'what'], picks: []});

    const req3 = httpMocks.createRequest(
       {method: 'POST', url: '/api/create', query: {rounds: "293"},  body: {drafters: 'Kev\nAli\nLi', options: 'D\nE\nF123'}});
    const res3 = httpMocks.createResponse();
    createDraft(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepEqual(res3._getData(), {id: 2, rounds: 293, drafters: ['Kev', 'Ali', 'Li'], options: ['D', 'E', 'F123'], picks: []});
  });

  it('listDraft', function() {
    const req1 = httpMocks.createRequest(
        {method: 'GET', url: '/api/list', query: {id: '0'}});
    const res1 = httpMocks.createResponse();
    listDraft(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getData(), {id: 0, rounds: 2, drafters: ['Kevin', 'Alice', 'Lisa'], options: ['A', 'B', 'C'], picks: []});

    const req2 = httpMocks.createRequest(
        {method: 'GET', url: '/api/list', query: {id: '1'}});
    const res2 = httpMocks.createResponse();
    listDraft(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepEqual(res2._getData(), {id: 1, rounds: 100, drafters: ['Bob', 'Sam', 'People'], options: ['this', 'that', 'what'], picks: []});

    const req3 = httpMocks.createRequest(
        {method: 'GET', url: '/api/list', query: {id: '2'}});
    const res3 = httpMocks.createResponse();
    listDraft(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepEqual(res3._getData(), {id: 2, rounds: 293, drafters: ['Kev', 'Ali', 'Li'], options: ['D', 'E', 'F123'], picks: []});
  });

  it('pickInDraft', function() {
    const req1 = httpMocks.createRequest(
        {method: 'GET', url: '/api/pick', query: {id: '0', drafter: 'Kevin', option: 'A'}});
    const res1 = httpMocks.createResponse();
    pickInDraft(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getData(), {id: 0, rounds: 2, drafters: ['Kevin', 'Alice', 'Lisa'], 
    options: ['A', 'B', 'C'], picks: [{num: 1, drafter: 'Kevin', option: 'A'}]});

    const req2 = httpMocks.createRequest(
        {method: 'GET', url: '/api/pick', query: {id: '0', drafter: 'Alicw', option: 'B'}});
    const res2 = httpMocks.createResponse();
    pickInDraft(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepEqual(res2._getData(), {id: 0, rounds: 2, drafters: ['Kevin', 'Alice', 'Lisa'],
    options: ['A', 'B', 'C'], picks: [{num: 1, drafter: 'Kevin', option: 'A'}, {num: 2, drafter: 'Alicw', option: 'B'}]});

    const req3 = httpMocks.createRequest(
        {method: 'GET', url: '/api/pick', query: {id: '0', drafter: 'Lisa', option: 'C'}});
    const res3 = httpMocks.createResponse();
    pickInDraft(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepEqual(res3._getData(), {id: 0, rounds: 2, drafters: ['Kevin', 'Alice', 'Lisa'],
    options: ['A', 'B', 'C'], picks: [{num: 1, drafter: 'Kevin', option: 'A'}, {num: 2, drafter: 'Alicw', option: 'B'}, 
    {num: 3, drafter: 'Lisa', option: 'C'}]});
    
  });

});
