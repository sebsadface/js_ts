import React from 'react';
import { cipher_encode, cipher_decode, crazy_caps_decode, crazy_caps_encode, pig_latin_decode, pig_latin_encode} from './latin_ops';
import { explode, compact } from './char_list';


/** Returns UI that displays a form asking for encode/decode input. */
export function MakeForm(_: {}): JSX.Element {
    // TODO: Replace this with something fully functional.
    return (
        <form action="/" method="get">
          <label htmlFor="word">word: </label>
          <input type="text" id="word" name="word"></input>

          <select id="algo" name="algo">
            {<option value="cipher" label="cipher"></option>}
            {<option value="crazy-caps" label='crazy-caps'></option>}
            {<option value="pig-latin" label='pig-latin'></option>}
          </select>

            <label htmlFor="encode"> encode: </label>
           <input type="radio" id="encode" name="op" value="encode"></input>

           <label htmlFor="encode"> decode: </label>
          <input type="radio" id="decode" name="op" value="decode"></input>

          <input type="submit" value="Submit"></input>
        </form>);
}


/** Properties expected for the ShowResult UI below. */
export interface ShowResultProps {
    word: string;
    algo: "cipher" | "crazy-caps" | "pig-latin";
    op: "encode" | "decode";
}

/**
 * Returns UI that shows the result of applying the specified operation to the
 * given word.
 */
export function ShowResult(props: ShowResultProps): JSX.Element {
    switch (props.algo) {
      case "cipher": switch (props.op) {
        case "encode": return <p><code>{compact(cipher_encode(explode(props.word)))}</code></p>;
        case "decode": return <p><code>{compact(cipher_decode(explode(props.word)))}</code></p>;
      }
      case "crazy-caps": switch (props.op) {
        case "encode": return <p><code>{compact(crazy_caps_encode(explode(props.word)))}</code></p>;
        case "decode": return <p><code>{compact(crazy_caps_decode(explode(props.word)))}</code></p>;
      }
      case "pig-latin":switch (props.op) {
        case "encode": return <p><code>{compact(pig_latin_encode(explode(props.word)))}</code></p>;
        case "decode": return <p><code>{compact(pig_latin_decode(explode(props.word)))}</code></p>;
      }
    }
}