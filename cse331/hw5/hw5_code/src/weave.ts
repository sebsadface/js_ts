import { List, nil, cons, rev } from './list';
import { Color } from './color';

/**
 * Returns the list of colors shown in the each of the odd rows (first,
 * third, fifth, etc.) by a warp-faced weave with the given warp colors.
 * @param list of all the (warp) colors in the weave
 * @return take(colors), i.e., every other color starting from the first
 */
export function weaveWarpFacedOdds(colors: List<Color>): List<Color> {
  let rest: List<Color> = colors;
  let done: List<Color> = nil;

  // {{Inv: weaveWarpFacedOdds(colors) = concat(rev(done), weaveWarpFacedOdds(rest))}}
  while (rest !== nil && rest.tl !== nil) {
    done = cons(rest.hd, done);
    rest = (rest.tl).tl;
  }

  if (rest === nil) {
    // We have take(colors) = concat(rev(done), take(nil))   since rest = nil
    //                      = concat(rev(done), nil)         def of take
    //                      = rev(done)                      by Fact C
    return rev(done);
  } else {
    return rev(cons(rest.hd, done));
  }
}

/**
 * Returns the list of colors shown in the each of the even rows (second,
 * fourth, etc.) by a warp-faced weave with the given warp colors.
 * @param list of all the (warp) colors in the weave
 * @return skip(colors), i.e., every other color starting from the second
 */
export function weaveWarpFacedEvens(colors: List<Color>): List<Color> {
  let rest: List<Color> = colors;
  let done: List<Color> = nil;

  // {{Inv: weaveWarpFacedEvens(colors) = concat(rev(done), weaveWarpFacedEvens(rest))}}
  while (rest !== nil && rest.tl !== nil) {
    done = cons((rest.tl).hd, done);
    rest = (rest.tl).tl;
  }

  if (rest === nil) {
    return rev(done);
  } else {
   return rev(done);
  }
}

/**
 * Returns the list of colors shown in the each of the odd rows (first, third,
 * fifth, etc.) by a balanced weave with the given warp and weft colors.
 * @param list of all the (warp) colors in the weave
 * @para c (weft) color to replace with
 * @return leave(colors, c)
 */
export function weaveBalancedOdds(colors: List<Color>, c: Color): List<Color> {
  let rest: List<Color> = colors;
  let done: List<Color> = nil;

  // {{Inv: weaveBalancedOdds(colors, c) = concat(rev(done), weaveBalancedOdds(rest, c))}}
  while (rest !== nil && rest.tl !== nil) {
    done = cons(c, cons(rest.hd, done));
    rest = (rest.tl).tl;
  }

  if (rest === nil) {
    return rev(done);
  } else {
    return rev(cons(rest.hd, done));
  }
}

/**
 * Returns the list of colors shown in the each of the even rows (second,
 * fourth, etc.) by a balanced weave with the given warp and weft colors.
 * @param list of all the (warp) colors in the weave
 * @para c (weft) color to replace with
 * @return replace(colors, c)
 */
export function weaveBalancedEvens(colors: List<Color>, c: Color): List<Color> {
  let rest: List<Color> = colors;
  let done: List<Color> = nil;

  // {{Inv: weaveBalancedEvens(colors, c) = concat(rev(done), weaveBalancedEvens(rest, c))}}
  while (rest !== nil && rest.tl !== nil) {
    done = cons(rest.tl.hd, cons(c, done));
    rest = (rest.tl).tl;
  }

  if (rest === nil) {
    return rev(done);
  } else {
    return rev(cons(c, done));
  }
}

/**
 * Returns the given number of rows of a weave with the given colors
 * @param rows the (natural) number of rows in the weave
 * @param colors the weft colors in each row
 * @returns list of the given length where the odd values are the colors of
 *      weaveWarpFacedOdds and the even values are the colors of
 *      weaveWarpFacedEvens.
 * @returns the function defined recursively (on rows) by
 *   - weaveWarpFaced(0, colors) = nil
 *   - weaveWarpFaced(1, colors) = cons(weaveWarpFacedEvens(colors), nil)
 *   - weaveWarpFaced(n+2, colors) =
 *         cons(weaveWarpFacedEvens(colors),
 *             cons(weaveWarpFacedOdds(colors), weaveWarpFaced(n, colors)))
 */
export function weaveWarpFaced(rows: number, colors: List<Color>): List<List<Color>> {
  let i: number = 0;
  let s: List<List <Color>> = nil;

  if (rows % 2 !== 0) {
    s = cons(weaveWarpFacedEvens(colors), nil);
    i = i + 1;
  }

  // {{Inv: s = weaveWarpFaced(i, colors)}}
  while (i !== rows) {
    s = cons(weaveWarpFacedEvens(colors), cons(weaveWarpFacedOdds(colors), s));
    i = i + 2;
  }

  return s;
}

/**
 * Returns the given number of rows of a balanced weave with the given colors
 * @param rows the (natural) number of rows in the weave
 * @param colors the warp colors in each row
 * @param c the weft color
 * @returns the function defined recursively (on rows) by
 *   - weaveBalanced(0, colors, c) = nil
 *   - weaveBalanced(1, colors, c) = cons(weaveBalancedEvens(colors, c), nil)
 *   - weaveBalanced(n+2, colors, c) =
 *         cons(weaveBalancedEvens(colors, c),
 *             cons(weaveBalancedRows(colors, c), weaveBalanced(n, colors, c)))
 */
export function weaveBalanced(rows: number, colors: List<Color>, c: Color): List<List<Color>> {
  let i: number = 0;
  let s: List<List <Color>> = nil;

  if (rows % 2 !== 0) {
    s = cons(weaveBalancedEvens(colors, c), nil);
    i = i + 1;
  }

  // {{Inv: s = weaveBalanced(i, colors, c)}}
  while (i !== rows) {
    s = cons(weaveBalancedEvens(colors, c), cons(weaveBalancedOdds(colors, c), s));
    i = i + 2;
  }

  return s;
}
