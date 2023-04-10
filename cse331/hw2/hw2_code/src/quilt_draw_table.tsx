import * as React from 'react';
import { RED, Square, Row, Quilt } from './quilt';
import { JsxList, jnil, jcompact } from './jsx_list';


/** Returns a TD that displays the square orientation as text. */
export function SquareTableElem(props: {square: Square, key: number}): JSX.Element {
  const cls = (props.square.color == RED) ? 'sq-red' : 'sq-green';
  return <td key={props.key} className={cls}>{props.square.corner}</td>;
}

export function RowTableElems(props: {row: Row, key: number}): JsxList {
  console.log(props); // TODO: remove
  return jnil;        // TODO: replace
}

export function RowTableElem(props: {row: Row, key: number}): JSX.Element {
  return (<tr key={props.key}>
      {jcompact(RowTableElems({row: props.row, key: 0}))}
    </tr>);
};

export function QuiltTableElems(props: {quilt: Quilt, key: number}): JsxList {
  console.log(props); // TODO: remove
  return jnil;        // TODO: replace
}

export function QuiltTableElem(props: {quilt: Quilt}): JSX.Element {
  console.log(props); // TODO: remove
  return <p>TODO: replace with a table</p>;
};
