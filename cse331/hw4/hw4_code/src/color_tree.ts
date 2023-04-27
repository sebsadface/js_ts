import { List, nil, len, split } from './list';
import { COLORS, ColorInfo } from './colors';
import { ColorNode, empty, node } from './color_node';
import { ColorList, findMatchingNamesIn } from './color_list';

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

/**
 *  Look up a color name in a binary search tree.
 * @param y  The color name to look up
 * @param root The root of the color binary search tree
 * @requires root is a Color binary search tree
 * @returns The ColorNode containing the color name if it is in the tree, or empty otherwise
 */
export function lookup(y: string, root: ColorNode): ColorNode {
    if (root === empty) {
        return empty;
    } else if (y === root.info[0]) {
        return root;
    } else if (y < root.info[0]) {
        return lookup(y, root.before);
    } else {
        return lookup(y, root.after);
    }
}

// TODO: add interfaces, classes, functions here

// An implementation of ColorList that uses a binary search tree
 class ColorTree implements ColorList {
    /**
     * RI: this.colortree = makeBst(this.colorlist)
     * AF: obj = this.colorlist
     */
    readonly colorlist : List<ColorInfo>;
    readonly colortree: ColorNode;

    /**
     * Creates a new ColorTree with the given list of colors
     * makes obj = this.colorlist
     * makes this.colortree = makeBst(this.colorlist)
     */
    constructor (colorlist: List<ColorInfo>) {
        this.colorlist = colorlist;
        this.colortree = makeBst(colorlist);
    }

    /**
   * Returns a list of all color names that include the given text
   * @param text Text to look for in the names of the colors (case insensitive)
   * @returns a list of all color names that include the given text in obj
   */
    findMatchingNames(text: string): List<string> {
        return findMatchingNamesIn(text, this.colorlist);
    }

    /**
   * Returns the background and foreground CSS colors to highlight with this color.
   * @param name Name of the color to look for
   * @throws Error if there is no such color
   * @returns (bg, fg) from obj where bg is the CSS background color and fg is foreground
   */
    getColorCss(name: string): readonly [string, string] {
        return getColorCssIn(name, this.colortree);
    }
}

/**
 * Creates a new ColorTree using the COLORS list
 * @returns a new ColorTree using the COLORS list
 */
export function makeColorTree(): ColorTree {
    return new ColorTree(COLORS);
}

// Returns the colors from the root entry with this color name. Throws
// an Error none is found (i.e., we hit the child of a leaf of the tree).
function getColorCssIn(name: string, root: ColorNode): readonly [string, string] {
    if (root === empty) {
      throw new Error(`no color called "${name}"`);
    } else if (name === root.info[0]) {
      return [root.info[1], root.info[2] ? '#F0F0F0' : '#101010'];
    } else if (name < root.info[0]) {
        return getColorCssIn(name, root.before);
    } else {
        return getColorCssIn(name, root.after);
    }
}
