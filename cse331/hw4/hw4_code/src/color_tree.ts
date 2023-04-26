import { List, nil, len, split } from './list';
import { ColorInfo } from './colors';
import { ColorNode, empty, node } from './color_node';

// TODO: Uncomment and complete

/**
 * Make a balanced binary search tree from a sorted list of colors.
 * @param L  A sorted list of colors
 * @requires L is sorted by color name
 * @returns A balanced binary search tree containing the same colors as L
 */
export function makeBst(L: List<ColorInfo>): ColorNode {
   if (L === nil) {
    return empty;
   } else { 
    const [P, S] = split(Math.floor(len(L) / 2), L);
    if (S === nil) {
        // This should never happen
        throw new Error();
    } 
    return node(S.hd, makeBst(P), makeBst(S.tl));
   }
}

export function lookup(y: string, root: ColorNode): ColorNode {
    if (root === empty) {
        return empty;
    }
}

// TODO: add interfaces, classes, functions here