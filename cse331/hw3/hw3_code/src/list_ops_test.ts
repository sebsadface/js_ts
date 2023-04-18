import * as assert from 'assert';
import { compact, explode } from './char_list';
import { last } from './list_ops';
import { nil, List } from './list';
import { cipher_decode, cipher_encode, crazy_caps_decode, crazy_caps_encode } from './latin_ops';


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

  it('cipher_encode', function() {
     const l1: List<number> =  nil;
     const l2: List<number> = explode("a");
     const l3: List<number> = explode("z");
     const l4: List<number> = explode("ok");
     const l5: List<number> = explode("washington");
     const l6: List<number> = explode("hello world");

    // 0-1-many heuristic, base case
    assert.deepEqual(cipher_encode(l1), nil);

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(compact(cipher_encode(l2)), "e");

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(compact(cipher_encode(l3)), "c");

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(compact(cipher_encode(l4)), "us");

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(compact(cipher_encode(l5)), "fezlomdbum");

     // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(compact(cipher_encode(l6)), "lirru fuhrt");

  });

  it('cipher_decode', function() {
     const l1: List<number> =  nil;
     const l2: List<number> = explode("e");
     const l3: List<number> = explode("c");
     const l4: List<number> = explode("us");
     const l5: List<number> = explode("fezlomdbum");
     const l6: List<number> = explode("lirru fuhrt");

    // 0-1-many heuristic, base case
    assert.deepEqual(cipher_decode(l1), nil);

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(compact(cipher_decode(l2)), "a");

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(compact(cipher_decode(l3)), "z");

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(compact(cipher_decode(l4)), "ok");

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(compact(cipher_decode(l5)), "washington");

     // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(compact(cipher_decode(l6)), "hello world");

  });

  it('crazy_caps_encode', function() {
     const l1: List<number> =  nil;
     const l2: List<number> = explode("e");
     const l3: List<number> = explode("c");
     const l4: List<number> = explode("us");
     const l5: List<number> = explode("fezlomdbum");
     const l6: List<number> = explode("lirru fuhrt");

    // 0-1-many heuristic, base case
    assert.deepEqual(crazy_caps_encode(l1), nil);

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(compact(crazy_caps_encode(l2)), "a");

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(compact(crazy_caps_encode(l3)), "z");

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_encode(l4)), "ok");

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_encode(l5)), "washington");

     // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_encode(l6)), "hello world");

  });

  it('crazy_caps_decode', function() {
     const l1: List<number> =  nil;
     const l2: List<number> = explode("e");
     const l3: List<number> = explode("c");
     const l4: List<number> = explode("us");
     const l5: List<number> = explode("fezlomdbum");
     const l6: List<number> = explode("lirru fuhrt");

    // 0-1-many heuristic, base case
    assert.deepEqual(crazy_caps_decode(l1), nil);

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(compact(crazy_caps_decode(l2)), "a");

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(compact(crazy_caps_decode(l3)), "z");

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_decode(l4)), "ok");

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_decode(l5)), "washington");

     // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_decode(l6)), "hello world");

  });

});
