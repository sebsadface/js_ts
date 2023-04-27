import { compact, explode } from './char_list';
import { List, nil, cons, explode_array, split_at } from './list';


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

const OPEN = "[".charCodeAt(0);
const MIDDLE = "|".charCodeAt(0);
const CLOSE = "]".charCodeAt(0);

function findHighlights(chars: List<number>): List<Highlight> {
  if (chars === nil) {
    return nil;
  }
  
  const [U, V] = split_at(chars, OPEN);
  const [P, S] = split_at(chars.tl, MIDDLE);
  const [X, Y] = split_at(S, CLOSE);
  
  if (S === nil || X === nil || Y === nil) {
    return cons({color: "white", text: compact(chars)}, nil);
  } else if (chars.hd !== OPEN) {
    return cons({color: "white", text: compact(U)}, findHighlights(V));
  } else {
    const hightlight : Highlight = {color: compact(P).toLowerCase(), text: compact(X.tl)};
    return cons(hightlight, findHighlights(Y.tl));
  }

}

/**
 * Parses a string of text into a list of highlights. 
 * @param text Text to parse into HighLights is a string of the form "<TEXT>[<COLOR>|<TEXT>]<TEXT>" with 0 to many "[<COLOR>|<TEXT>]" blocks.
 * @returns List of HighLights {color: <COLOR>, text: <TEXT>} described by the input text. If no "[<COLOR>|<TEXT>]" block is found or if the block
 * is malformed, color will be defaulted to "white".
 */
export function parseHighlightText(text: string): List<Highlight> {
  return findHighlights(explode(text));
}