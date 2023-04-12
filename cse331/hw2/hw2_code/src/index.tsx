import React from 'react';
import { createRoot } from 'react-dom/client';
import { Color, RED, GREEN, Quilt } from './quilt';
import { PatternA, PatternB, PatternC, PatternD, PatternE } from './patterns';
import { QuiltElem } from './quilt_draw';
import { symmetrize } from './quilt_ops';
import { QuiltTableElem } from './quilt_draw_table';


// Returns the pattern number, which must be A-E, or undefined if it was not
// provided or is not in the valid range.
function GetPattern(params: URLSearchParams): string|undefined {
  if (!params.has("pattern"))
    return undefined;

  switch (params.get("pattern")) {
    case "A": return "A";
    case "B": return "B";
    case "C": return "C";
    case "D": return "D";
    case "E": return "E";
    default:  return undefined;
  }
}


// Returns the color requested or undefined if none was specified.
function GetColor(params: URLSearchParams): Color|undefined {
  if (!params.has("color")) {
    return undefined;
  } else {
    const color = params.get("color")!.toLowerCase();
    if (color === "red") {
      return RED; 
    } else if (color === "green") {
      return GREEN;
    } else {
      return undefined;
    }
  }
}

// Returns the number of rows, which must be a natural number. Defaults to 4.
function GetRows(params: URLSearchParams): number {
  if (!params.has("rows")) {
    return 4;
  } else {
    const rows = parseInt(params.get("rows")!);
    return !isNaN(rows) ? rows : 4;
  }
}


// Parse the arguments to the page, which can indicate the color and number of
// rows in the quilt.
const params = new URLSearchParams(window.location.search);
GetColor(params);  // not used yet
GetRows(params);   // not used yet

// Invoke the function for the pattern given in the query params.
const pattern = GetPattern(params);
const sym = params.has("symmetrize");
if (pattern === undefined) {
  window.location.href = "/?pattern=A";
} else {
  let result: Quilt | Error = new Error('unknown error');
  try {
    switch (pattern) {
      case "A": result = sym? symmetrize(PatternA(GetRows(params), GetColor(params))) : PatternA(GetRows(params), GetColor(params)); break;
      case "B": result = sym? symmetrize(PatternB(GetRows(params), GetColor(params))) : PatternB(GetRows(params), GetColor(params)); break;
      case "C": result = sym? symmetrize(PatternC(GetRows(params), GetColor(params))) : PatternC(GetRows(params), GetColor(params)); break;
      case "D": result = sym? symmetrize(PatternD(GetRows(params), GetColor(params))) : PatternD(GetRows(params), GetColor(params)); break;
      case "E": result = sym? symmetrize(PatternE(GetRows(params), GetColor(params))) : PatternE(GetRows(params), GetColor(params)); break;
      default:  throw new Error('impossible');
    }
  } catch (e) {
    if (e instanceof Error) {
      result = e;
    } else {
      throw e;
    }
  }

  // Display the result of the function.
  const root = createRoot(document.getElementById('main')!);
  const tab = params.has("table");
  if (result instanceof Error) {
    root.render(<p><b>Error</b>: {result.message}</p>);
  } else {
    tab ?
    root.render(
      <React.StrictMode><QuiltTableElem quilt={result}/></React.StrictMode>) :
    root.render(
      <React.StrictMode><QuiltElem quilt={result}/></React.StrictMode>);
  }
}
