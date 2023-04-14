import { List, nil } from './list';


/** Returns the last element in the given list. */
export function last(L: List<number>): number {
    if (L === nil) {
        throw new Error("empty list has no last element");
    } else if (L.tl === nil) {
        return L.hd;
    } else {
        return last(L.tl);
    }
}


/** Returns the prefix consting of the first n elements of L. */
export function prefix<A>(n: number, L: List<A>): List<A> {
  n;  // TODO: remove this (just making the compiler happy)
  return L;  // TODO: replace
}


/** Returns the suffix consting of the elements of L after the first n. */
export function suffix<A>(n: number, L: List<A>): List<A> {
  n;  // TODO: remove this (just making the compiler happy)
  return L;  // TODO: replace
}