
import * as assert from 'assert';
import * as React from 'react';
import { NW, NE, GREEN, RED, STRAIGHT, ROUND, Square, rnil, rcons, SW, SE, Row, qnil, Quilt,qcons } from './quilt';
import { SquareTableElem, RowTableElem, RowTableElems, QuiltTableElems} from './quilt_draw_table';
import { jcons, jnil } from './jsx_list';


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
  const sw_sq: Square = {corner: SW, color: RED, shape: ROUND};
  const se_sq: Square = {corner: SE, color: RED, shape: ROUND};

  it('RowTableElems', function() {
    const r1 : Row = rcons(nw_sq, rnil);
    const r2 : Row = rcons(se_sq, rnil);
    const r3 : Row = rcons(ne_sq, rcons(se_sq, rnil));
    const r4 : Row = rcons(sw_sq, rcons(ne_sq, rcons(nw_sq, rnil)));
    const r5 : Row = rcons(nw_sq, rcons(se_sq, rcons(sw_sq, rcons(ne_sq, rnil))));
    // 0-1-many heuristic, base case
    assert.deepEqual(RowTableElems({row: rnil, key: 0}), jnil);

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(RowTableElems({row: r1, key: 1}), 
                      jcons((<td key={1} className={"sq-green"}>NW</td>), jnil));

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(RowTableElems({row: r2, key: 2}), 
                      jcons((<td key={2} className={"sq-red"}>SE</td>), jnil));

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(RowTableElems({row: r3, key: 3}),
                      jcons((<td key={3} className={"sq-green"}>NE</td>), 
                      jcons((<td key={4} className={"sq-red"}>SE</td>), jnil)));

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(RowTableElems({row: r4, key: 4}), 
                      jcons((<td key={4} className={"sq-red"}>SW</td>), 
                      jcons((<td key={5} className={"sq-green"}>NE</td>), 
                      jcons((<td key={6} className={"sq-green"}>NW</td>), jnil))));
     
    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(RowTableElems({row: r5, key: 5}), 
                      jcons((<td key={5} className={"sq-green"}>NW</td>), 
                      jcons((<td key={6} className={"sq-red"}>SE</td>), 
                      jcons((<td key={7} className={"sq-red"}>SW</td>), 
                      jcons((<td key={8} className={"sq-green"}>NE</td>), jnil)))));
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
    const r1 : Row = rcons(se_sq, rnil);
    const r2 : Row = rcons(nw_sq, rnil);
    const u : Row = rcons(se_sq, rcons(sw_sq, rnil));
    const v : Row = rcons(ne_sq, rcons(nw_sq, rnil));
    const w : Row = rcons(sw_sq, rcons(ne_sq, rnil));
    const x : Row = rcons(nw_sq, rcons(se_sq, rnil));
    const q1 : Quilt = qcons(r1, qnil);
    const q2 : Quilt = qcons(r2, qnil);
    const q3 : Quilt = qcons(u, qcons(v, qnil));
    const q4 : Quilt = qcons(u, qcons(v, qcons(w, qnil)));
    const q5 : Quilt = qcons(u, qcons(v, qcons(w, qcons(x, qnil))));

    // 0-1-many heuristic, base case
    assert.deepEqual(QuiltTableElems({quilt: qnil, key: 0}), jnil);

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(QuiltTableElems({quilt: q1, key: 1}), 
                      jcons(<tr key={1}>{[
                              <td key={0} className={"sq-red"}>SE</td>,
                            ]}</tr>, jnil));

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(QuiltTableElems({quilt: q2, key: 2}), 
                      jcons(<tr key={2}>{[
                              <td key={0} className={"sq-green"}>NW</td>,
                            ]}</tr>, jnil));

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(QuiltTableElems({quilt: q3, key: 3}),
                      jcons(<tr key={3}>{[
                              <td key={0} className={"sq-red"}>SE</td>,
                              <td key={1} className={"sq-red"}>SW</td>,
                            ]}</tr>, 
                      jcons(<tr key={4}>{[
                              <td key={0} className={"sq-green"}>NE</td>,
                              <td key={1} className={"sq-green"}>NW</td>,
                            ]}</tr>, jnil)));

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(QuiltTableElems({quilt: q4, key: 4}), 
                      jcons(<tr key={4}>{[
                              <td key={0} className={"sq-red"}>SE</td>,
                              <td key={1} className={"sq-red"}>SW</td>,
                            ]}</tr>, 
                      jcons(<tr key={5}>{[
                              <td key={0} className={"sq-green"}>NE</td>,
                              <td key={1} className={"sq-green"}>NW</td>,
                            ]}</tr>, 
                      jcons(<tr key={6}>{[
                              <td key={0} className={"sq-red"}>SW</td>,
                              <td key={1} className={"sq-green"}>NE</td>,
                            ]}</tr>, jnil))));
     
    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(QuiltTableElems({quilt: q5, key: 5}), 
                      jcons(<tr key={5}>{[
                              <td key={0} className={"sq-red"}>SE</td>,
                              <td key={1} className={"sq-red"}>SW</td>,
                            ]}</tr>, 
                      jcons(<tr key={6}>{[
                              <td key={0} className={"sq-green"}>NE</td>,
                              <td key={1} className={"sq-green"}>NW</td>,
                            ]}</tr>, 
                      jcons(<tr key={7}>{[
                              <td key={0} className={"sq-red"}>SW</td>,
                              <td key={1} className={"sq-green"}>NE</td>,
                            ]}</tr>, 
                      jcons(<tr key={8}>{[
                              <td key={0} className={"sq-green"}>NW</td>,
                              <td key={1} className={"sq-red"}>SE</td>,
                            ]}</tr>, jnil)))));
                            
  });

  it('QuiltTableElem', function() {
    const u : Row = rcons(se_sq, rcons(sw_sq, rnil));
    const v : Row = rcons(ne_sq, rcons(nw_sq, rnil));
    const w : Row = rcons(sw_sq, rcons(ne_sq, rnil));
    const x : Row = rcons(nw_sq, rcons(se_sq, rnil));
    const q1 : Quilt = qcons(u, qcons(v, qcons(w, qnil)));
    const q2 : Quilt = qcons(u, qcons(v, qcons(w, qcons(x, qnil))));

    // straight-line code heuristic, 1st test
        assert.deepEqual(QuiltTableElems({quilt: q1, key: 0}), 
                      <p>{[<tr key={0}>{[
                              <td key={0} className={"sq-red"}>SE</td>,
                              <td key={1} className={"sq-red"}>SW</td>,
                            ]}</tr>, 
                      <tr key={1}>{[
                              <td key={0} className={"sq-green"}>NE</td>,
                              <td key={1} className={"sq-green"}>NW</td>,
                            ]}</tr>, 
                      <tr key={2}>{[
                              <td key={0} className={"sq-red"}>SW</td>,
                              <td key={1} className={"sq-green"}>NE</td>,
                            ]}</tr>]}</p>);
  
    // straight-line code heuristic, 2nd test
    assert.deepEqual(QuiltTableElems({quilt: q2, key: 1}), 
                      <p>{[<tr key={1}>{[
                              <td key={0} className={"sq-red"}>SE</td>,
                              <td key={1} className={"sq-red"}>SW</td>,
                            ]}</tr>, 
                      <tr key={2}>{[
                              <td key={0} className={"sq-green"}>NE</td>,
                              <td key={1} className={"sq-green"}>NW</td>,
                            ]}</tr>, 
                      <tr key={3}>{[
                              <td key={0} className={"sq-red"}>SW</td>,
                              <td key={1} className={"sq-green"}>NE</td>,
                            ]}</tr>, 
                      <tr key={4}>{[
                              <td key={0} className={"sq-green"}>NW</td>,
                              <td key={1} className={"sq-red"}>SE</td>,
                            ]}</tr>]}</p>);

  });

});
