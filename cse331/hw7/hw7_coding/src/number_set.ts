import { List, nil, cons } from './list';

/** Maximum number that can be represented in a set. */
export let MAX: number = 100;

// Change the value of max in some tests (to keep the size reasonable)
export function setMaxForTesting(max: number) {
  if (max < 1 || Math.round(max) !== max)
    throw new Error(`invalid positive integer ${max}`);
  MAX = max;
}


/**
 * A set of numbers ranging from 0 to MAX (inclusive).
 */
export interface NumberSet {
  // AF: obj = this.set

  /**
 * Updates this set to not include any numbers listed in set.
 * @param set set of elements to remove from obj
 * @modifies obj
 * @result obj[x] = true iff obj_0[x] = true AND set2[x] = false
 */
  removeAll (set: NumberSet): void;

  /**
 * Updates this set to include all the numbers listed in set.
 * @param set set of elements to add to obj
 * @modifies obj
 * @result obj[x] = true iff obj_0[x] = true OR set2[x] = true
 */
  addAll (set: NumberSet): void;

  /**
 * Returns a list of all the numbers in this set if the set is finite,
 * otherwise return returns the numbers in the set that is inside the given
 * bounds.
 * @param a the minimum number to include in the list
 * @param b the maximum number to include in the list
 * @requires 0 <= a <= b <= MAX
 * @return a list L such that if obj is finite, then x is in L iff obj[x] = true
 * otherwise x is in L iff obj[x] = true and a <= x <= b
 */
  getNumbers (a:number, b:number): List<number>;

  /**
   * Updates this set to be the complement of itself.
   * @modifies obj
   * @result obj[x] = true iff obj_0[x] = false
   */
  complement (): void;

} // TODO (1a): replace this with the NumberSet interface

// TODO (1b, 4b): add the class BooleanNumberSet
class BooleanNumberSet implements NumberSet {
  /**
   * AF: obj = this.numberSet
   */
  numberSet : boolean[];

  /** 
   * Creates a new BooleanNumberSet with the given list of numbers
   * Makes obj = this.numberSet
   */
  constructor (numberSet : boolean[]) {
    this.numberSet = numberSet;
  }

   removeAll(set: NumberSet): void {
    for (let i = 1; i <= MAX; i++) {
      if ((set as BooleanNumberSet).numberSet[i] === true)
        this.numberSet[i] = false;
    }
  }

  addAll(set: NumberSet): void {
    for (let i = 1; i <= MAX; i++) {
      if ((set as BooleanNumberSet).numberSet[i] === true)
        this.numberSet[i] = true;
    }
  }


  getNumbers(_: number, __: number): List<number> {
    let vals: List<number> = nil;
    for (let i = MAX; i >= 1; i--) {  // make it sorted, just for fun
      if (this.numberSet[i] === true)
        vals = cons(i, vals);
    }
    return vals;
  }

  complement(): void {
    complement(this.numberSet);
  }
}

/**
 * Returns the given list of numbers in a BooleanNumberSet.
 * @param vals list of numbers to include in the set (and nothing else)
 * @requires every x in vals satisfies 1 <= x <= 100
 * @returns a BooleanNumberSet S such that S.numberSet[x-1] === true iff x is in vals
 */
export function makeBooleanNumberSet(vals: List<number>): BooleanNumberSet {  // TODO(1c): change the function to makeBooleanNumberSet
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

  return new BooleanNumberSet(set);
}


// TODO: Ignore this for now. Uncomment and use in part 4b
/**
 * Updates set to have the opposite set of numbers: all the numbers (between 1
 * and 100) that were not in the set passed in.
 * @param set Set to complement
 * @modifies set
 * @effects set[x] = not set_0[x]
 */
export function complement(set: boolean[]): void {
  for (let i = 1; i <= MAX; i++) {
    set[i] = !set[i];
  }
}
