import * as assert from 'assert';
import { quadratic3, abs_value3, abs_value4, count_pairs, count_pairs2 } from './funcs';


describe('funcs', function() {

  it('quadratic3', function() {
    assert.strictEqual(quadratic3(1), 0);     // check that (1 - 1)^2 = 0
    assert.strictEqual(quadratic3(2), 1);     // check that (2 - 1)^2 = 1
    assert.notStrictEqual(quadratic3(3), 4);  // check that (3 - 1)^2 = 4 fails
  });

  it('abs_value3', function() {
    assert.strictEqual(abs_value3(2), 2);      // check that |2| = 2
    assert.strictEqual(abs_value3(-2), 2);     // check that |-2| = 2
    assert.notStrictEqual(abs_value3(-1), 1);  // check that |-1| = 1 fails
  });

  it('abs_value4', function() {
    assert.strictEqual(abs_value4(5), 5);
    assert.strictEqual(abs_value4(4), 4);
    assert.strictEqual(abs_value4(3), 3);
    assert.strictEqual(abs_value4(2), 2);
    assert.strictEqual(abs_value4(1), 1);
    assert.strictEqual(abs_value4(-1), 1);
    assert.strictEqual(abs_value4(-2), 2);
    assert.strictEqual(abs_value4(-3), 3);
    assert.strictEqual(abs_value4(-4), 4);
    assert.strictEqual(abs_value4(-5), 5);
    assert.strictEqual(abs_value4(0), undefined);  // check that |0| fails
  });

  it('count_pairs', function() {
    assert.strictEqual(count_pairs(0), 0);
    assert.strictEqual(count_pairs(2), 1);
    assert.strictEqual(count_pairs(4), 2);
    assert.strictEqual(count_pairs(6), 3);
    assert.strictEqual(count_pairs(8), 4);
    assert.strictEqual(count_pairs(10), 5);

    assert.strictEqual(count_pairs(1), 0);
    assert.notStrictEqual(count_pairs(3), 1);
  });

  it('count_pairs2', function() {
    assert.strictEqual(count_pairs2(0), 0);
    assert.strictEqual(count_pairs2(2), 1);
    assert.strictEqual(count_pairs2(4), 2);
    assert.strictEqual(count_pairs2(6), 3);
    assert.strictEqual(count_pairs2(8), 4);
    assert.strictEqual(count_pairs2(10), 5);

    assert.strictEqual(count_pairs2(1), 0);
    assert.strictEqual(count_pairs2(3), 1);
    assert.notStrictEqual(count_pairs2(5), 2);
  });

});