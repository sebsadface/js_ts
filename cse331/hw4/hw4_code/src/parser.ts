import { List, nil, cons, explode_array } from './list';


/** Text and the name of the highlight (background) color to show it in. */
export type Highlight = {
  color: string,
  text: string
}


// Turns a list of lines into a list of Highlights. Each line should start with
// a color name, followed by a space, followed by the text with that color.
function getHighlights(lines: List<string>): List<Highlight> {
  if (lines === nil) {
    return nil;
  } else {
    const index = lines.hd.indexOf(' ');
    if (index < 0) {
      throw new Error(`line does not start with a color: "${lines.hd}"`);
    }
    const color = lines.hd.substring(0, index).toLowerCase();
    const text = lines.hd.substring(index+1).trim();
    return cons({color: color, text: text}, getHighlights(lines.tl));
  }
}


/**
 * Parses a list of highlights, written one highlight per line.
 * @param text Text to parse into highlights
 * @returns List of highlights described by the text, where each line is an
 *     individual highlight with the color being the first word of the line.
 */
export function parseHighlightLines(text: string): List<Highlight> {
  if (text.trim() === "") {
    return nil;
  } else {
    return getHighlights(explode_array(text.split('\n')));
  }
}


// TODO: Uncomment and complete:

// const OPEN = "[".charCodeAt(0);
// const MIDDLE = "|".charCodeAt(0);
// const CLOSE = "]".charCodeAt(0);

// function findHighlights(chars: List<number>): List<Highlight> {
  
// }

// export function parseHighlightText(text: string): List<Highlight> {
  
// }