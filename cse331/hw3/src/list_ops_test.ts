import * as assert from 'assert';
import { explode } from './char_list';
import { last } from './list_ops';
import { nil } from './list';


describe('list_ops', function() {

  it('last', function() {
    assert.throws(() => last(nil), Error);

    assert.deepEqual(last(explode("a")), "a".charCodeAt(0));
    assert.deepEqual(last(explode("_")), "_".charCodeAt(0));

    assert.deepEqual(last(explode("stray")), "y".charCodeAt(0));
    assert.deepEqual(last(explode("shrug")), "g".charCodeAt(0));
    assert.deepEqual(last(explode("hub")), "b".charCodeAt(0));
    assert.deepEqual(last(explode("hm")), "m".charCodeAt(0));
  });

  it('prefix', function() {
    // TODO: add tests
  });

  it('suffix', function() {
    // TODO: add tests
  });

});
