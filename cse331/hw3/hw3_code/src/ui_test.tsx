import * as assert from 'assert';
import * as React from 'react';
import { ShowResult } from './ui';


describe('ui', function() {

  it('ShowResult', function() {
    assert.deepEqual(
        ShowResult({word: "cray", algo: "crazy-caps", op: "encode"}),
        <p><code>Hi there</code></p>);
  });

});