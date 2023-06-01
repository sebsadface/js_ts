import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { createDraft, listDraft, pickInDraft, checkId } from './routes';


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
        {method: 'POST', url: '/api/create', query: {rounds: '2'}, body: {drafters:'Kevin\nAlice\nLisa', options:'A\nB\nC'}});
    const res1 = httpMocks.createResponse();
    createDraft(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getData(), {id: 0, rounds: 2, drafters: ['Kevin', 'Alice', 'Lisa'], options: ['A', 'B', 'C'], 
    picks: [], availableOps: ['A', 'B', 'C'], currentDrafter: 'Kevin', complete: false, currentRound: 1});

    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/create', query: {rounds: '100'}, body: {drafters: 'Bob\nSam\nJames', options:'De\nE\nF'}});
    const res2 = httpMocks.createResponse();
    createDraft(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepEqual(res2._getData(), {id: 1, rounds: 100, drafters: ['Bob', 'Sam', 'James'], options: ['De', 'E', 'F'],
    picks: [], availableOps: ['De', 'E', 'F'], currentDrafter: 'Bob', complete: false, currentRound: 1});
    
    const req3 = httpMocks.createRequest(
        {method: 'POST', url: '/api/create', query: {rounds: '67'}, body: {drafters: 'Who\nam\nI', options: 'I\nDont\nKnow'}});
    const res3 = httpMocks.createResponse();
    createDraft(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepEqual(res3._getData(), {id: 2, rounds: 67, drafters: ['Who', 'am', 'I'], options: ['I', 'Dont', 'Know'],
    picks: [], availableOps: ['I', 'Dont', 'Know'], currentDrafter: 'Who', complete: false, currentRound: 1});

    const req4 = httpMocks.createRequest(
        {method: 'POST', url: '/api/create', query: {rounds: '1'}, body: {drafters: 'p1\np2', options: 'A\nB\nC\nD'}});
    const res4 = httpMocks.createResponse();
    createDraft(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 200);
    assert.deepEqual(res4._getData(), {id: 3, rounds: 1, drafters: ['p1', 'p2'], options: ['A', 'B', 'C', 'D'],
    picks: [], availableOps: ['A', 'B', 'C', 'D'], currentDrafter: 'p1', complete: false, currentRound: 1});
      
  });

  it('listDraft', function() {
    const req1 = httpMocks.createRequest(
      {method: 'GET', url: '/api/list', query: {id: '0'}});
    const res1 = httpMocks.createResponse();
    listDraft(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getData(), {id: 0, rounds: 2, drafters: ['Kevin', 'Alice', 'Lisa'], options: ['A', 'B', 'C'],
    picks: [], availableOps: ['A', 'B', 'C'], currentDrafter: 'Kevin', complete: false, currentRound: 1});

    const req2 = httpMocks.createRequest(
      {method: 'GET', url: '/api/list', query: {id: '1'}});
    const res2 = httpMocks.createResponse();
    listDraft(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepEqual(res2._getData(), {id: 1, rounds: 100, drafters: ['Bob', 'Sam', 'James'], options: ['De', 'E', 'F'],
    picks: [], availableOps: ['De', 'E', 'F'], currentDrafter: 'Bob', complete: false, currentRound: 1});

    const req3 = httpMocks.createRequest(
      {method: 'GET', url: '/api/list', query: {id: '2'}});
    const res3 = httpMocks.createResponse();
    listDraft(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepEqual(res3._getData(), {id: 2, rounds: 67, drafters: ['Who', 'am', 'I'], options: ['I', 'Dont', 'Know'],
    picks: [], availableOps: ['I', 'Dont', 'Know'], currentDrafter: 'Who', complete: false, currentRound: 1});
    
  });

  it('pickInDraft', function() {
    const req1 = httpMocks.createRequest(
        {method: 'GET', url: '/api/pick', query: {id: '0', drafter: 'Kevin', option: 'A'}});
    const res1 = httpMocks.createResponse();
    pickInDraft(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getData(), {id: 0, rounds: 2, drafters: ['Kevin', 'Alice', 'Lisa'], options: ['A', 'B', 'C'],
    picks: [{num: 1, drafter: 'Kevin', option: 'A'}], availableOps: ['B', 'C'], currentDrafter: 'Alice', complete: false, currentRound: 1});

    const req2 = httpMocks.createRequest(
        {method: 'GET', url: '/api/pick', query: {id: '0', drafter: 'Alice', option: 'B'}});
    const res2 = httpMocks.createResponse();
    pickInDraft(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepEqual(res2._getData(), {id: 0, rounds: 2, drafters: ['Kevin', 'Alice', 'Lisa'], options: ['A', 'B', 'C'],
    picks: [{num: 1, drafter: 'Kevin', option: 'A'}, {num: 2, drafter: 'Alice', option: 'B'}], availableOps: ['C'], 
    currentDrafter: 'Lisa', complete: false, currentRound: 1});
    
    const req3 = httpMocks.createRequest(
        {method: 'GET', url: '/api/pick', query: {id: '0', drafter: 'Lisa', option: 'C'}});
    const res3 = httpMocks.createResponse();
    pickInDraft(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepEqual(res3._getData(), {id: 0, rounds: 2, drafters: ['Kevin', 'Alice', 'Lisa'], options: ['A', 'B', 'C'],
    picks: [{num: 1, drafter: 'Kevin', option: 'A'}, {num: 2, drafter: 'Alice', option: 'B'}, {num: 3, drafter: 'Lisa', option: 'C'}],
    availableOps: [], currentDrafter: 'Lisa', complete: true, currentRound: 1});
    
    const req4 = httpMocks.createRequest(
        {method: 'GET', url: '/api/pick', query: {id: '3', drafter: 'p1', option: 'C'}});
    const res4 = httpMocks.createResponse();
    pickInDraft(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 200);
    assert.deepEqual(res4._getData(), {id: 3, rounds: 1, drafters: ['p1', 'p2'], options: ['A', 'B', 'C', 'D'],
    picks: [{num: 1, drafter: 'p1', option: 'C'}], availableOps: ['A', 'B', 'D'], currentDrafter: 'p2', complete: false, currentRound: 1});

    const req5 = httpMocks.createRequest(
        {method: 'GET', url: '/api/pick', query: {id: '3', drafter: 'p2', option: 'B'}});
    const res5 = httpMocks.createResponse();
    pickInDraft(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 200);
    assert.deepEqual(res5._getData(), {id: 3, rounds: 1, drafters: ['p1', 'p2'], options: ['A', 'B', 'C', 'D'],
    picks: [{num: 1, drafter: 'p1', option: 'C'}, {num: 2, drafter: 'p2', option: 'B'}], availableOps: ['A', 'D'],
    currentDrafter: 'p2', complete: true, currentRound: 1});

  });

  it('checkId', function() {
    const req1 = httpMocks.createRequest(
        {method: 'GET', url: '/api/idcheck', query: {id: '0'}});
    const res1 = httpMocks.createResponse();
    checkId(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getData(), 'true');

    const req2 = httpMocks.createRequest(
        {method: 'GET', url: '/api/idcheck', query: {id: '1'}});
    const res2 = httpMocks.createResponse();
    checkId(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepEqual(res2._getData(), 'true');

    const req3 = httpMocks.createRequest(
        {method: 'GET', url: '/api/idcheck', query: {id: '5'}});
    const res3 = httpMocks.createResponse();
    checkId(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepEqual(res3._getData(), 'false');
  });

});
