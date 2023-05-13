import { List, nil, cons } from './list';

/** Maximum number that can be represented in a set. */
export let MAX: number = 100;

// Change the value of max in some tests (to keep the size reasonable)
export function setMaxForTesting(max: number) {
  if (max < 1 || Math.round(max) !== max)
    throw new Error(`invalid positive integer ${max}`);
  MAX = max;
}


// Indicates the presence of x in the set by set[x] === true
export type NumberSet = boolean[]; // TODO (1a): replace this with the NumberSet interface

// TODO (1b, 4b): add the class BooleanNumberSet

/**
 * Returns the given list of numbers in a number set.
 * @param vals list of numbers to include in the set (and nothing else)
 * @requires every x in vals satisfies 1 <= x <= 100
 * @returns a set S such that S[x-1] === true iff x is in vals
 */
export function makeNumberSet(vals: List<number>): NumberSet {  // TODO(1c): change the function to makeBooleanNumberSet
  // Start set out as the empty set.
  const set = new Array(MAX+1);
  for (let i = 0; i <= MAX; i++)
    set[i] = false;

  // Inv: set indicates the presence of just the numbers we've skipped past
  while (vals !== nil) {
    if (vals.hd < 1 || MAX < vals.hd)
      throw new Error(`unsupported number ${vals.hd} (must be 1-${MAX})`);

    set[vals.hd] = true;
    vals = vals.tl;
  }

  return set;
}

/**
 * Updates set1 to not include any numbers listed in set2.
 * @param set1 set from which to remove elements
 * @param set2 set of elements to remove from set1
 * @modifies set1
 * @result set1[x] = true iff set1_0[x] = true AND set2[x] = false
 */
export function removeAll(set1: NumberSet, set2: NumberSet): void {
  for (let i = 1; i <= MAX; i++) {
    if (set2[i] === true)
      set1[i] = false;
  }
}

/**
 * Updates set1 to include all the numbers listed in set2.
 * @param set1 set to add elements to
 * @param set2 set of elements to add to set1
 * @modifies set1
 * @result set1[x] = true iff set1_0[x] = true OR set2[x] = true
 */
export function addAll(set1: NumberSet, set2: NumberSet): void {
  for (let i = 1; i <= MAX; i++) {
    if (set2[i] === true)
      set1[i] = true;
  }
}

/**
 * Returns a list of the numbers present in the given set
 * @param set the set in question
 * @return a list L such that x is in L iff set[x] = tue
 */
export function getNumbers(set: NumberSet): List<number> {
  let vals: List<number> = nil;
  for (let i = MAX; i >= 1; i--) {  // make it sorted, just for fun
    if (set[i] === true)
      vals = cons(i, vals);
  }
  return vals;
}

// TODO: Ignore this for now. Uncomment and use in part 4b
// /**
//  * Updates set to have the opposite set of numbers: all the numbers (between 1
//  * and 100) that were not in the set passed in.
//  * @param set Set to complement
//  * @modifies set
//  * @effects set[x] = not set_0[x]
//  */
// export function complement(set: boolean[]): void {
//   for (let i = 1; i <= MAX; i++) {
//     set[i] = !set[i];
//   }
// }
