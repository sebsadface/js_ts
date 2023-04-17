import { createRoot } from 'react-dom/client';
import { MakeForm, ShowResult } from './ui';


// Parse the arguments to the page. Retrieve the parameters that should be
// supplied on form submit.
const params = new URLSearchParams(window.location.search);
const word = params.get("word");
const algo = params.get("algo");
const op = params.get("op");

// Show the UI with the result if all required parameters were provided/valid.
// Otherwise, show the form.
const root = createRoot(document.getElementById('main')!);
if (word === null ||
    (algo !== "cipher" && algo !== "crazy-caps" && algo !== "pig-latin") ||
    (op !== "encode" && op !== "decode")) {
    root.render(MakeForm({}));
} else {
    root.render(ShowResult({word: word, algo: algo, op: op}));
}