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

  // TODO: add an Inv
  while (rest !== nil && rest.tl !== nil) {
    // TODO: implement this
    break;  // TODO: remove
  }

  if (rest === nil) {
    // We have take(colors) = concat(rev(done), take(nil))   since rest = nil
    //                      = concat(rev(done), nil)         def of take
    //                      = rev(done)                      by Fact C
    return rev(done);
  } else {
    // TODO: implement this
    throw new Error(`odd length not yet implemented`);
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

  // TODO: add an Inv
  while (rest !== nil && rest.tl !== nil) {
    // TODO: implement this
    break;  // TODO: remove
  }

  if (rest === nil) {
    return rev(done);
  } else {
    // TODO: implement this
    throw new Error(`odd length not yet implemented`);
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

  // TODO: add an Inv
  while (rest !== nil && rest.tl !== nil) {
    // TODO: implement this
    break;  // TODO: remove
  }

  if (rest === nil) {
    return rev(done);
  } else {
    // TODO: implement this
    throw new Error(`odd length not yet implemented`);
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

  // TODO: add an Inv
  while (rest !== nil && rest.tl !== nil) {
    // TODO: implement this
    break;  // TODO: remove
  }

  if (rest === nil) {
    return rev(done);
  } else {
    // TODO: implement this
    throw new Error(`odd length not yet implemented`);
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
 *             cons(weaveWarpFacedRows(colors), weaveWarpFaced(n, colors)))
 */
export function weaveWarpFaced(rows: number, colors: List<Color>): List<List<Color>> {
  // TODO: implement this with a while loop instead
  // Be sure to document your loop invariant with an Inv comment above the loop
  return cons(weaveWarpFacedEvens(colors),
      cons(weaveWarpFacedOdds(colors), nil));
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
  // TODO: implement this with a while loop instead
  // Be sure to document your loop invariant with an Inv comment above the loop
  return cons(weaveBalancedEvens(colors, c),
      cons(weaveBalancedOdds(colors, c), nil));
}
