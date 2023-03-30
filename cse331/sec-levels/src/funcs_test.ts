import * as assert from 'assert';
import { quadratic1, quadratic2, abs_value1, abs_value2 } from './funcs';


describe('funcs', function() {

  it('quadratic1', function() {
    assert.strictEqual(quadratic1(1), 0);     // check that (1 - 1)^2 = 0
    assert.notStrictEqual(quadratic1(2), 1);  // check that (2 - 1)^2 = 1 fails
  });

  it('quadratic2', function() {
    assert.strictEqual(quadratic2(2), 1);     // check that (2 - 1)^2 = 1
    assert.notStrictEqual(quadratic2(1), 0);  // check that (1 - 1)^2 = 0 fails
  });

  it('abs_value1', function() {
    assert.strictEqual(abs_value1(2), 2);     // check that |2| = 2
    assert.strictEqual(abs_value1(-2), 2);    // check that |-2| = 2
    assert.notStrictEqual(abs_value1(1), 1);  // check that |1| = 1 fails
  });

  it('abs_value2', function() {
    assert.strictEqual(abs_value2(2), 2);     // check that |2| = 2
    assert.strictEqual(abs_value2(-2), 2);    // check that |-2| = 2
    assert.notStrictEqual(abs_value2(1), 1);  // check that |1| = 1 fails
  });

});