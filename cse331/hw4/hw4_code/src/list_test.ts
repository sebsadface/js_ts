import * as assert from 'assert';
import { nil, cons, len, split, compact_list, explode_array, split_at } from './list';
import { explode } from './char_list';


describe('list', function() {

  it('len', function() {
    assert.deepEqual(len(nil), 0);
    assert.deepEqual(len(cons(1, nil)), 1);
    assert.deepEqual(len(cons(1, cons(2, nil))), 2);
    assert.deepEqual(len(cons(3, cons(2, cons(1, nil)))), 3);
  });

  it('split', function() {
    assert.deepEqual(split(0, explode("")), [nil, nil]);

    assert.deepEqual(split(0, explode("a")), [nil, explode("a")]);
    assert.deepEqual(split(1, explode("a")), [explode("a"), nil]);

    assert.deepEqual(split(0, explode("as")), [nil, explode("as")]);
    assert.deepEqual(split(1, explode("as")), [explode("a"), explode("s")]);
    assert.deepEqual(split(2, explode("as")), [explode("as"), nil]);

    assert.deepEqual(split(0, explode("stray")), [nil, explode("stray")]);
    assert.deepEqual(split(1, explode("stray")), [explode("s"), explode("tray")]);
    assert.deepEqual(split(2, explode("stray")), [explode("st"), explode("ray")]);
    assert.deepEqual(split(3, explode("stray")), [explode("str"), explode("ay")]);
    assert.deepEqual(split(4, explode("stray")), [explode("stra"), explode("y")]);
    assert.deepEqual(split(5, explode("stray")), [explode("stray"), explode("")]);
  });
  
  it('split_at', function() {
    // TODO: add tests

    // 0-1-many heuristic, 1st base case test L = nil
    assert.deepEqual(split_at(explode(""), 0), [nil, nil]);

     // 0-1-many heuristic, 2nd base case test L = nil
    assert.deepEqual(split_at(explode(""), 12), [nil, nil]);

    // 0-1-many heuristic, 1st base case test L.hd = c
    assert.deepEqual(split_at(explode("a"), "a".charCodeAt(0)), [nil, explode("a")]);

    // 0-1-many heuristic, 2nd base case test L.hd = c
    assert.deepEqual(split_at(explode("stray"), "s".charCodeAt(0)), [nil, explode("stray")]);

    // 0-1-many heuristic, 1st 1 case, single recursive call calling branch L = nil
    assert.deepEqual(split_at(explode("a"), "b".charCodeAt(0)), [explode("a"), nil]);

    // 0-1-many heuristic, 2nd 1 case, single recursive call calling branch L = nil
    assert.deepEqual(split_at(explode("s"), "d".charCodeAt(0)), [explode("s"), nil]);

    // 0-1-many heuristic, 1st 1 case, single recursive call calling branch L.hd = c
    assert.deepEqual(split_at(explode("stray"), "t".charCodeAt(0)), [explode("s"), explode("tray")]);

    // 0-1-many heuristic, 2nd 1 case, single recursive call calling branch L.hd = c
    assert.deepEqual(split_at(explode("tray"), "r".charCodeAt(0)), [explode("t"), explode("ray")]);

    // 0-1-many heuristic, 1st many case, multiple recursive calls calling branch L = nil
    assert.deepEqual(split_at(explode("stray"), "b".charCodeAt(0)), [explode("stray"), nil]);

    // 0-1-many heuristic, 2nd many case, multiple recursive calls calling branch L = nil
    assert.deepEqual(split_at(explode("pretty"), "d".charCodeAt(0)), [explode("pretty"), nil]);

    // 0-1-many heuristic, 1st many case, multiple recursive calls calling branch L.hd = c
    assert.deepEqual(split_at(explode("stray"), "r".charCodeAt(0)), [explode("st"), explode("ray")]);

    // 0-1-many heuristic, 2nd many case, multiple recursive calls calling branch L.hd = c
    assert.deepEqual(split_at(explode("pretty"), "t".charCodeAt(0)), [explode("pre"), explode("tty")]);

  });

  it('compact_list', function() {
    assert.deepEqual(compact_list(nil), []);
    assert.deepEqual(compact_list(cons(1, nil)), [1]);
    assert.deepEqual(compact_list(cons(1, cons(2, nil))), [1, 2]);
    assert.deepEqual(compact_list(cons(3, cons(2, cons(1, nil)))), [3, 2, 1]);
  });

  it('explode_array', function() {
    assert.deepEqual(explode_array([]), nil);
    assert.deepEqual(explode_array([1]), cons(1, nil));
    assert.deepEqual(explode_array([1, 2]), cons(1, cons(2, nil)));
    assert.deepEqual(explode_array([1, 2, 3]), cons(1, cons(2, cons(3, nil))));
  });

});