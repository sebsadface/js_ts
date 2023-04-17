export type List<A> =
    | "nil"
    | {readonly kind: "cons", readonly hd: A, readonly tl: List<A>};

export const nil = "nil";

export function cons<A>(hd: A, tl: List<A>): List<A> {
  return {kind: "cons", hd: hd, tl: tl};
}


/** Returns the length of the given list. */
export function len<A>(L: List<A>): number {
  if (L === nil) {
    return 0;
  } else {
    return 1 + len(L.tl);
  }
}

/** Returns the list consisting of L followed by R. */
export function concat<A>(L: List<A>, R: List<A>): List<A> {
  if (L === nil) {
    return R;
  } else {
    return cons(L.hd, concat(L.tl, R));
  }
}


/** Returns the reverse of the given list. */
export function rev<A>(L: List<A>): List<A> {
  if (L === nil) {
    return nil;
  } else {
    return concat(rev(L.tl), cons(L.hd, nil));
  }
}