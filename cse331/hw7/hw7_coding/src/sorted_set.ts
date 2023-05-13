/**
 * Updates vals1 to not contain any of the numbers in vals2. Both arrays are
 * assumed to be sorted and contain only distinct numbers.
 * @param vals1 the first sorted array of distinct integers
 * @param vals2 the second sorted array of distinct integers
 * @modifies vals1
 * @effects vals1 = without(vals1_0, vals2)
 */
export function removeAll(vals1: number[], vals2: number[]): void {
  let i: number = 0;
  let j: number = 0;
  let k: number = 0;

  // Inv: vals1[0 .. k-1] = without(vals1_0[0 .. i-1], vals2) and
  //      vals1[k .. n-1] = vals1_0[k .. n-1] and
  //      vals2[j-1] < vals1[i] (if these indexes exist)
  while (i !== vals1.length) {
    if ((j === vals2.length) || (vals1[i] < vals2[j])) {
      vals1[k] = vals1[i];
      i = i + 1;
      k = k + 1;
    } else if (vals1[i] > vals2[j]) {
      j = j + 1;
    } else {
      i = i + 1;
      j = j + 1;
    }
  }

  // Inv: vals1[0 .. k-1] = without(vals1_0, vals2)
  while (vals1.length !== k)
    vals1.pop();
}

/**
 * Updates vals1 to contain all of the numbers in vals2. Both arrays are assumed
 * to be sorted and contain only distinct numbers.
 * @param vals1 the first sorted array of distinct integers
 * @param vals2 the second sorted array of distinct integers
 * @modifies vals1
 * @effects vals1 = with(vals1_0, vals2)
 */
export function addAll(vals1: number[], vals2: number[]): void {
  let i: number = 0;
  let j: number = 0;

  const vals3: number[] = [];

  // Inv: vals3 = with(vals1[0 .. i-1], vals2) and
  //      vals2[j-1] < vals1[i] (if these indexes exist)
  while (i !== vals1.length || (j !== vals2.length)) {
    if ((j === vals2.length) || (vals1[i] < vals2[j])) {
      vals3.push(vals1[i]);
      i = i + 1;
    } else if ((i === vals1.length) || vals1[i] > vals2[j]) {
      vals3.push(vals2[j]);
      j = j + 1;
    } else {
      vals3.push(vals1[i]);
      i = i + 1;
      j = j + 1;
    }
  }

  // Now have vals3 = with(vals1_0, vals2)
  if (vals3.length < vals1.length)
    throw new Error('impossible');

  // Inv: vals1[0 .. k-1] = vals3[0 .. k-1]
  for (let k = 0; k < vals1.length; k++)
    vals1[k] = vals3[k];

  // Inv: vals1[0 .. vals1.length-1] = vals3[0 .. vals1.length-1]
  while (vals1.length !== vals3.length)
    vals1.push(vals3[vals1.length]);
}


/**
 * Removes any duplicate elements from the given sorted array of numbers.
 * @param L a sorted array of numbers
 * @modifies L
 * @effects L[0] < L[1] < ... < L[L.length-1] and
 *     contains(L, x) = contains(L_0, x) for any x
 */
export function uniquify(L: number[]): void {
  if (L.length === 0)
    return;

  let i = 1;
  let k = 1;

  // Inv: L[0 .. k-1] = uniquify(L_0[0 .. i-1]) and
  //      L[k .. n-1] = L_0[k .. n-1] and
  //      L[i-1] = L[k-1]
  while (i !== L.length) {
    i = i + 1;  // TODO (3a): replace this with correct code
    k = k + 1;  // TODO (3a): replace this with correct code
  }

  // TODO (3a): implement the rest
}


// TODO (3b): add class SortedNumberSet

// TODO (3c): add function makeSortedNumberSet
