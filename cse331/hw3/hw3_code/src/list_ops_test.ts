import * as assert from 'assert';
import { compact, explode } from './char_list';
import { last, prefix, suffix } from './list_ops';
import { nil, List } from './list';


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

  const s1: List<number> = nil;
  const s2: List<number> = explode("f");
  const s3: List<number> = explode("v");
  const s4: List<number> = explode("us");
  const s5: List<number> = explode("abcdefghijklmnopqrstuvwxyz");
  const s6: List<number> = explode("CSE 331");

  it('prefix', function() {
    // Undefined case (n < 0), test 1
    assert.throws(() => prefix(-1, s1), Error);

    // Undefined case (n < 0), test 2
    assert.throws(() => prefix(-12, s2), Error);

    // undefined case (n > 0 && L === nil), test 1
    assert.throws(() => prefix(1, s1), Error);

    // undefined case (n > 0 && L === nil), test 2
    assert.throws(() => prefix(10, s1), Error);

    // undefined case (n > len(L)), test 1
    assert.throws(() => prefix(27, s5), Error);

    // undefined case (n > len(L)), test 2
    assert.throws(() => prefix(8, s6), Error);


    // 0-1-many heuristic, base case test 1
    assert.deepEqual(prefix(0, s1), nil);

    // 0-1-many heuristic, base case test 2
    assert.deepEqual(prefix(0, s5), nil);

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(compact(prefix(1, s3)), "v");

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(compact(prefix(1, s4)), "u");

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(compact(prefix(2, s4)), "us");

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(compact(prefix(5, s5)), "abcde");

    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(compact(prefix(6, s6)), "CSE 33");
  });

  it('suffix', function() {
    // Undefined case (n < 0), test 1
    assert.throws(() => suffix(-1, s1), Error);

    // Undefined case (n < 0), test 2
    assert.throws(() => suffix(-12, s2), Error);

    // undefined case (n > 0 && L === nil), test 1
    assert.throws(() => suffix(1, s1), Error);

    // undefined case (n > 0 && L === nil), test 2
    assert.throws(() => suffix(10, s1), Error);

    // undefined case (n > len(L)), test 1
    assert.throws(() => suffix(27, s5), Error);

    // undefined case (n > len(L)), test 2
    assert.throws(() => suffix(8, s6), Error);


    // 0-1-many heuristic, base case test 1
    assert.deepEqual(suffix(0, s1), nil);

    // 0-1-many heuristic, base case test 2
    assert.deepEqual(compact(suffix(0, s5)), "abcdefghijklmnopqrstuvwxyz");

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(suffix(1, s3), nil);

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(compact(suffix(1, s4)), "s");

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(compact(suffix(2, s5)), "cdefghijklmnopqrstuvwxyz");

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(compact(suffix(5, s5)), "fghijklmnopqrstuvwxyz");

    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(compact(suffix(6, s6)), "1");
  });

});
