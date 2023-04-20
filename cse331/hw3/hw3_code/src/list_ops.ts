import { List, nil, cons } from './list';


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
    if (n < 0 || (n > 0 && L === nil)) {
        throw new Error("Invalid inputs. Expecting n >= len(L)");
    } else if (n === 0 || L === nil) {
        return nil;
    } else {
        return cons(L.hd, prefix(n - 1, L.tl));
    }
} 


/** Returns the suffix consting of the elements of L after the first n. */
export function suffix<A>(n: number, L: List<A>): List<A> {
    if (n < 0 || (n > 0 && L === nil)) {
        throw new Error("Invalid inputs. Expecting n >= len(L)");
    } else if (n === 0 || L === nil) {
        return L;
    } else {
        return suffix(n - 1, L.tl);
    }
}