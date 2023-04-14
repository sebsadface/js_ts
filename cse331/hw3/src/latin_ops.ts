import { List, nil, cons, concat, len } from './list';
import { last, prefix, suffix } from './list_ops'


/** Determines whether the given character is a vowel. */
function is_latin_vowel(c: number): boolean {
    const ch = String.fromCharCode(c).toLowerCase();
    return "aeiouy".indexOf(ch) >= 0;
}

/** Determines whether the given character is a Latin consonant. */
function is_latin_consonant(c: number): boolean {
    const ch = String.fromCharCode(c).toLowerCase();
    return "bcdfghjklmnpqrstvwxz".indexOf(ch) >= 0;
}

/** Changes most Latin alphabetic characters to different ones. */
export function next_latin_char(c: number): number {
    switch (String.fromCharCode(c)) {
        case "a": return "e".charCodeAt(0);
        case "e": return "i".charCodeAt(0);
        case "i": return "o".charCodeAt(0);
        case "o": return "u".charCodeAt(0);
        case "u": return "y".charCodeAt(0);
        case "y": return "a".charCodeAt(0);

        case "b": return "p".charCodeAt(0);
        case "p": return "j".charCodeAt(0);
        case "j": return "g".charCodeAt(0);
        case "g": return "d".charCodeAt(0);
        case "d": return "t".charCodeAt(0);
        case "t": return "b".charCodeAt(0);

        case "c": return "k".charCodeAt(0);
        case "k": return "s".charCodeAt(0);
        case "s": return "z".charCodeAt(0);
        case "z": return "c".charCodeAt(0);

        case "f": return "v".charCodeAt(0);
        case "v": return "w".charCodeAt(0);
        case "w": return "f".charCodeAt(0);

        case "h": return "l".charCodeAt(0);
        case "l": return "r".charCodeAt(0);
        case "r": return "h".charCodeAt(0);

        case "m": return "n".charCodeAt(0);
        case "n": return "m".charCodeAt(0);

        case "q": return "x".charCodeAt(0);
        case "x": return "q".charCodeAt(0);

        default: return c;
    }
}

/** Inverse of next_char. */
export function prev_latin_char(c: number): number {
    switch (String.fromCharCode(c)) {
        case "a": return "y".charCodeAt(0);
        case "e": return "a".charCodeAt(0);
        case "i": return "e".charCodeAt(0);
        case "o": return "i".charCodeAt(0);
        case "u": return "o".charCodeAt(0);
        case "y": return "u".charCodeAt(0);

        case "b": return "t".charCodeAt(0);
        case "p": return "b".charCodeAt(0);
        case "j": return "p".charCodeAt(0);
        case "g": return "j".charCodeAt(0);
        case "d": return "g".charCodeAt(0);
        case "t": return "d".charCodeAt(0);

        case "c": return "z".charCodeAt(0);
        case "k": return "c".charCodeAt(0);
        case "s": return "k".charCodeAt(0);
        case "z": return "s".charCodeAt(0);

        case "f": return "w".charCodeAt(0);
        case "v": return "f".charCodeAt(0);
        case "w": return "v".charCodeAt(0);

        case "h": return "r".charCodeAt(0);
        case "l": return "h".charCodeAt(0);
        case "r": return "l".charCodeAt(0);

        case "m": return "n".charCodeAt(0);
        case "n": return "m".charCodeAt(0);

        case "q": return "x".charCodeAt(0);
        case "x": return "q".charCodeAt(0);

        default: return c;
    }
}


/** Returns the number of consonants at the start of the given string */
export function count_consonants(L: List<number>): number|undefined {
    if (L === nil) {
        return undefined;
    } else if (is_latin_vowel(L.hd)) {
        return 0;
    } else if (is_latin_consonant(L.hd)) {
        const n = count_consonants(L.tl);
        if (n === undefined) {
            return undefined;
        } else {
            return n + 1;
        }
    } else {
        return undefined;
    }
}


// List containing the character codes for the string "AY".
const AY = cons("a".charCodeAt(0), cons("y".charCodeAt(0), nil));


/** Returns the translation of the given word to Pig Latin */
export function pig_latin_encode(L: List<number>): List<number> {
    // NOTE: this is incomplete. See Problem 6 for how to do this better.
    // TODO: If you do Problem 6, you can delete all this code.
    const n = count_consonants(L);
    if (n === undefined || n === 0) {
        return L;
    } else {
        const p = prefix(n, L);
        const r = suffix(n, L);
        return concat(r, concat(p, AY));
    }
}


/**
 * Returns the (probable) original word from its Pig Latin translation.
 * Throws an Error if this does not appear to be Pig Latin.
 */
export function pig_latin_decode(L: List<number>): List<number> {
    // NOTE: this is incomplete. See Problem 6 for how to do this better.
    // TODO: If you do Problem 6, you can delete all this code.
    const m = len(L);
    if (m < 4) {
        return L;
    } else {
        const lastCh = last(L);
        const last2Ch = last(prefix(m - 1, L));  // second to last
        const last3Ch = last(prefix(m - 2, L));  // third to last
        if (lastCh !== "y".charCodeAt(0) || last2Ch !== "a".charCodeAt(0) ||
            !is_latin_consonant(last3Ch)) {
            return L;  // not pig latin
        }

        const allButLast3 = prefix(m - 3, L);
        if (!is_latin_consonant(last(allButLast3))) {
          // move one consonant before "ay" to the front
          return cons(last3Ch, allButLast3);
        } else if (m < 5) {
          return L; // not pig latin
        }

        const last4Ch = last(allButLast3);
        const allButLast4 = prefix(m - 4, L);
        if (!is_latin_consonant(last(allButLast4))) {
          // move two consonants before "ay" to the front
          return cons(last4Ch, cons(last3Ch, allButLast4));
        }

        // Giving up here. There has to be a better way to do this...
        return L;
    }
}
