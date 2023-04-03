/** Calculates (incorrectly) the value (n-1)^2. */
export function quadratic3(n: number): number {
  return n - 1;
}

/** Calculates (incorrectly) the value |x|.  */
export function abs_value3(x: number): number {
  if (x > -2) {
    return x;
  } else {
    return -x;
  }
}

/** Calculates (incorrectly) the value |x|.  */
export function abs_value4(x: number): number|undefined {
  if (x < 0) {
    return -x;
  } else if (x > 0) {
    return x;
  }
}

/**
 * Returns the number of pairs we can get from n items, where n is a
 * non-negative integer.
 */
export function count_pairs(n: number): number {
  if (n === 0) {
    return 0;
  } else if (n % 2 === 0) {
    return 1 + count_pairs(n - 2);
  } else {
    return count_pairs(0);
  }
}

/**
 * Returns the number of pairs we can get from n items, where n is a
 * non-negative integer.
 */
export function count_pairs2(n: number): number {
  if (n === 0) {
    return 0;
  } else if (n % 2 === 0) {
    return 1 + count_pairs(n - 2);
  } else {
    return count_pairs((n - 2) * (n - 1));
  }
}