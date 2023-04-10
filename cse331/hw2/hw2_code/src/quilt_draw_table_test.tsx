
import * as assert from 'assert';
import * as React from 'react';
import { NW, NE, GREEN, RED, STRAIGHT, ROUND, Square, rnil, rcons } from './quilt';
import { SquareTableElem, RowTableElem } from './quilt_draw_table';


describe('quilt_draw_table', function() {

  it('SquareTableElem', function() {
    const sq1: Square = {corner: NE, color: GREEN, shape: ROUND};
    assert.deepEqual(SquareTableElem({square: sq1, key: 0}),
        (<td key={0} className={"sq-green"}>NE</td>));
    const sq2: Square = {corner: NW, color: RED, shape: STRAIGHT};
    assert.deepEqual(SquareTableElem({square: sq2, key: 1}),
        (<td key={1} className={"sq-red"}>NW</td>));
  });

  const nw_sq: Square = {corner: NW, color: GREEN, shape: ROUND};
  const ne_sq: Square = {corner: NE, color: GREEN, shape: ROUND};

  it('RowTableElems', function() {
    // TODO: implement
  });

  it('RowTableElem', function() {
    assert.deepEqual(RowTableElem({row: rcons(nw_sq, rnil), key: 0}),
        <tr key={0}>{[
            <td key={0} className={"sq-green"}>NW</td>,
        ]}</tr>);
    assert.deepEqual(RowTableElem({row: rcons(ne_sq, rnil), key: 0}),
        <tr key={0}>{[
            <td key={0} className={"sq-green"}>NE</td>,
        ]}</tr>);
  });

  it('QuiltTableElems', function() {
    // TODO: implement
  });

  it('QuiltTableElem', function() {
    // TODO: implement
  });

});
