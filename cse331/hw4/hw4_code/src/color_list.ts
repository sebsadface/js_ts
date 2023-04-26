import { ColorInfo, COLORS } from './colors';
import { List, cons, nil } from './list';

// TODO: add interfaces and classes here

/**
 * A list of colors that can be searched for matches and CSS colors
 */
export interface ColorList {

  /**
   * Returns a list of all color names that include the given text
   * @param text Text to look for in the names of the colors (case insensitive)
   * @returns list of all color names that include the given text
   */
  findMatchingNames(text: string): List<string>;

  /**
   * Returns the background and foreground CSS colors to highlight with this color.
   * @param name Name of the color to look for
   * @throws Error if there is no such color
   * @returns (bg, fg) where bg is the CSS background color and fg is foreground 
   */  
  getColorCss(name: string): readonly [string, string];
};

/**
 * An implementation of ColorList that caches a list of colors
*/
class SimpleColorList implements ColorList {
  /** 
   * RI: 
   * AF: obj = this.colorlist
   */
  readonly colorlist: List<ColorInfo>;
  
  /**
   * Creates a new SimpleColorList with the given list of colors
   * Makes obj = this.colorlist
   */
  constructor (colorlist: List<ColorInfo>) {
    this.colorlist = colorlist;
  }

  /**
   * Returns a list of all color names that include the given text
   * @param text Text to look for in the names of the colors (case insensitive)
   * @returns a list of all color names that include the given text in obj
   */
  findMatchingNames(text: string): List<string> {
    return findMatchingNamesIn(text, COLORS);
  }

  /**
   * Returns the background and foreground CSS colors to highlight with this color.
   * @param name Name of the color to look for
   * @throws Error if there is no such color
   * @returns (bg, fg) from obj where bg is the CSS background color and fg is foreground
   */
  getColorCss(name: string): readonly [string, string] {
    return getColorCssIn(name, COLORS);
  }

}

/**
 * Creates a new SimpleColorList using the COLORS list
 * @returns a new SimpleColorList using the COLORS list
 */
export function makeSimpleColorList(): SimpleColorList {
  return new SimpleColorList(COLORS);
}

  // Returns the colors from the (first) list entry with this color name. Throws
  // an Error none is found (i.e., we hit the end of the list).
  function getColorCssIn(name: string, colors: List<ColorInfo>): readonly [string, string] {
    if (colors === nil) {
      throw new Error(`no color called "${name}"`);
    } else if (colors.hd[0] === name) {
      return [colors.hd[1], colors.hd[2] ? '#F0F0F0' : '#101010'];
    } else {
      return getColorCssIn(name, colors.tl);
    }
  }

    // Returns a new list containing just the names of those colors that include the
  // given text.
  function findMatchingNamesIn(text: string, colors: List<ColorInfo>): List<string> {
    if (colors === nil) {
      return nil;
    } else if (colors.hd[0].includes(text)) {
      return cons(colors.hd[0], findMatchingNamesIn(text, colors.tl));
    } else {
      return findMatchingNamesIn(text, colors.tl);
    }
  }
