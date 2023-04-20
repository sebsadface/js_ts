import * as assert from 'assert';
import * as React from 'react';
import { ShowResult } from './ui';


describe('ui', function() {
  it('ShowResult', function() {
    // cipher encode test 1
    assert.deepEqual(
        ShowResult({word: "washington", algo: "cipher", op: "encode"}),
        <p><code>fezlomdbum</code></p>);

    // cipher encode test 2
    assert.deepEqual(
      ShowResult({word: "hello world", algo: "cipher", op: "encode"}),
      <p><code>lirru fuhrt</code></p>);

    // cipher decode test 1
    assert.deepEqual(
      ShowResult({word: "fezlomdbum", algo: "cipher", op: "decode"}),
      <p><code>washington</code></p>);

    //cipher decode test 2
    assert.deepEqual(
      ShowResult({word: "lirru fuhrt", algo: "cipher", op: "decode"}),
      <p><code>hello world</code></p>);

    //crazy-caps encode test 1
    assert.deepEqual(
      ShowResult({word: "washington", algo: "crazy-caps", op: "encode"}),
      <p><code>WaShInGtOn</code></p>);

    // crazy-caps encode test 2
    assert.deepEqual(
      ShowResult({word: "hello world", algo: "crazy-caps", op: "encode"}),
      <p><code>HeLlO WoRlD</code></p>);

    // crazy-caps decode test 1
    assert.deepEqual(
      ShowResult({word: "WaShInGtOn", algo: "crazy-caps", op: "decode"}),
      <p><code>washington</code></p>);

    // crazy-caps decode test 2
    assert.deepEqual(
      ShowResult({word: "HeLlO WoRlD", algo: "crazy-caps", op: "decode"}),
      <p><code>hello world</code></p>);

    // pig-latin encode test 1
    assert.deepEqual(
      ShowResult({word: "washington", algo: "pig-latin", op: "encode"}),
      <p><code>ashingtonway</code></p>);

    // pig-latin encode test 2
    assert.deepEqual(
      ShowResult({word: "stray", algo: "pig-latin", op: "encode"}),
      <p><code>aystray</code></p>);

    // pig-latin decpde test 1
    assert.deepEqual(
      ShowResult({word: "ashingtonway", algo: "pig-latin", op: "decode"}),
      <p><code>nwashingto</code></p>);

    // pig-latin decode test 2
    assert.deepEqual(
      ShowResult({word: "aystray", algo: "pig-latin", op: "decode"}),
      <p><code>stray</code></p>);
  });

});