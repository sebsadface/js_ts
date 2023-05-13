import * as assert from 'assert';
import { explode_array } from './list';
import { makeNumberSet, getNumbers, addAll, removeAll} from './number_set';


describe('number_set', function() {

  // TODO (1d): change these tests to use makeBooleanNumberSet and call the
  //            corresponding functions of the object (i.e. .getNumbers())
  // TODO (4b): change getNumbers to take additional params 0, 100

  it('makeNumberSet', function() {
    assert.deepEqual(getNumbers(makeNumberSet(explode_array([]))),
        explode_array([]));
    assert.deepEqual(getNumbers(makeNumberSet(explode_array([1]))),
        explode_array([1]));
    assert.deepEqual(getNumbers(makeNumberSet(explode_array([50]))),
        explode_array([50]));
    assert.deepEqual(getNumbers(makeNumberSet(explode_array([100]))),
        explode_array([100]));
    assert.deepEqual(getNumbers(makeNumberSet(explode_array([1, 2, 3]))),
        explode_array([1, 2, 3]));
    assert.deepEqual(getNumbers(makeNumberSet(explode_array([1, 2, 49, 50, 99, 100]))),
        explode_array([1, 2, 49, 50, 99, 100]));
  });

  it('addAll', function() {
    const set = makeNumberSet(explode_array([2, 4, 6, 8]));
    addAll(set, makeNumberSet(explode_array([])));
    assert.deepEqual(getNumbers(set), explode_array([2, 4, 6, 8]));

    addAll(set, makeNumberSet(explode_array([3])));
    assert.deepEqual(getNumbers(set), explode_array([2, 3, 4, 6, 8]));

    addAll(set, makeNumberSet(explode_array([5, 9])));
    assert.deepEqual(getNumbers(set), explode_array([2, 3, 4, 5, 6, 8, 9]));

    addAll(set, makeNumberSet(explode_array([1, 100])));
    assert.deepEqual(getNumbers(set), explode_array([1, 2, 3, 4, 5, 6, 8, 9, 100]));
  });

  it('removeAll', function() {
    const set = makeNumberSet(explode_array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
    removeAll(set, makeNumberSet(explode_array([])));
    assert.deepEqual(getNumbers(set), explode_array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

    removeAll(set, makeNumberSet(explode_array([10])));
    assert.deepEqual(getNumbers(set), explode_array([1, 2, 3, 4, 5, 6, 7, 8, 9]));

    removeAll(set, makeNumberSet(explode_array([1, 2, 3])));
    assert.deepEqual(getNumbers(set), explode_array([4, 5, 6, 7, 8, 9]));

    removeAll(set, makeNumberSet(explode_array([5, 7])));
    assert.deepEqual(getNumbers(set), explode_array([4, 6, 8, 9]));
  });

  // TODO: Ignore for now, uncomment in part 4b. 
  //       - You may have to add some imports upon uncommenting
  // it('complement', function() {
  //   setMaxForTesting(10);

  //   const set0 = makeBooleanNumberSet(explode_array([]));
  //   set0.complement();
  //   assert.deepEqual(set0.getNumbers(1, 100), explode_array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

  //   const set1 = makeBooleanNumberSet(explode_array([1]));
  //   set1.complement();
  //   assert.deepEqual(set1.getNumbers(1, 100), explode_array([2, 3, 4, 5, 6, 7, 8, 9, 10]));

  //   const set4 = makeBooleanNumberSet(explode_array([2, 4, 6, 8]));
  //   set4.complement();
  //   assert.deepEqual(set4.getNumbers(1, 100), explode_array([1, 3, 5, 7, 9, 10]));

  //   setMaxForTesting(100);
  // });

});
