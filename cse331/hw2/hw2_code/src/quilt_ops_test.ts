import * as assert from 'assert';
import { NW, NE, SW, SE, GREEN, ROUND, Square, rnil, rcons, qnil, qcons, Row, Quilt } from './quilt';
import { rflip_vert, sew, sflip_vert, symmetrize, qflip_vert, sflip_horz, rflip_horz, qflip_horz } from './quilt_ops';


describe('quilt_ops', function() {

  // We have 4 possible inputs (4 possible corners), making the function -1 correctness level
  // so we need exhaustively test all 4 possble corners.
  it('sflip_vert', function() {
    // Exhaustive test1, s = nw_sq
    assert.deepEqual(sflip_vert(nw_sq), sw_sq);

    // Exhaustive test2, s = ne_sq
    assert.deepEqual(sflip_vert(ne_sq), se_sq);

    // Exhaustive test3, s = sw_sq
    assert.deepEqual(sflip_vert(sw_sq), nw_sq);

    // Exhaustive test4, s = se_sq
    assert.deepEqual(sflip_vert(se_sq), ne_sq);
  });

  it('rflip_vert', function() {
    const r1 : Row = rcons(ne_sq, rnil);
    const r2 : Row = rcons(sw_sq, rnil);
    const r3 : Row = rcons(nw_sq, rcons(ne_sq, rnil));
    const r4 : Row = rcons(sw_sq, rcons(se_sq, rcons(sw_sq, rnil)));
    const r5 : Row = rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rcons(ne_sq, rnil))));

    // 0-1-many heuristic, base case
    assert.deepEqual(rflip_vert(rnil), rnil);

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(rflip_vert(r1), rcons(se_sq, rnil));

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(rflip_vert(r2), rcons(nw_sq, rnil));

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(rflip_vert(r3), rcons(sw_sq, rcons(se_sq, rnil)));

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(rflip_vert(r4), rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rnil))));
     
    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(rflip_vert(r5), rcons(sw_sq, rcons(se_sq, rcons(sw_sq, rcons(se_sq, rnil)))));
  });

  it('qflip_vert', function() {
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
    assert.deepEqual(qflip_vert(qnil), qnil);

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(qflip_vert(q1), qcons(rcons(ne_sq, rnil), qnil));

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(qflip_vert(q2), qcons(rcons(sw_sq, rnil), qnil));

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(qflip_vert(q3), 
                      qcons(rcons(se_sq, rcons(sw_sq, rnil)), qcons(rcons(ne_sq, rcons(nw_sq, rnil)), qnil)));

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(qflip_vert(q4), 
                      qcons(rcons(nw_sq, rcons(se_sq, rnil)), qcons(rcons(se_sq, rcons(sw_sq, rnil)), 
                            qcons(rcons(ne_sq, rcons(nw_sq, rnil)), qnil))));
     
    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(qflip_vert(q5), 
                      qcons(rcons(sw_sq, rcons(ne_sq, rnil)) , qcons(rcons(nw_sq, rcons(se_sq, rnil)), 
                            qcons(rcons(se_sq, rcons(sw_sq, rnil)), qcons(rcons(ne_sq, rcons(nw_sq, rnil)), qnil)))));
  });

  // We have 4 possible inputs (4 possible corners), making the function -1 correctness level
  // so we need exhaustively test all 4 possble corners.
  it('sflip_horz', function() {
    // Exhaustive test1, s = nw_sq
    assert.deepEqual(sflip_horz(nw_sq), ne_sq);

    // Exhaustive test2, s = ne_sq
    assert.deepEqual(sflip_horz(ne_sq), nw_sq);

    // Exhaustive test3, s = sw_sq
    assert.deepEqual(sflip_horz(sw_sq), se_sq);

    // Exhaustive test4, s = se_sq
    assert.deepEqual(sflip_horz(se_sq), sw_sq);
  });

  it('rflip_horz', function() {
    const r1 : Row = rcons(nw_sq, rnil);
    const r2 : Row = rcons(se_sq, rnil);
    const r3 : Row = rcons(nw_sq, rcons(se_sq, rnil));
    const r4 : Row = rcons(sw_sq, rcons(ne_sq, rcons(se_sq, rnil)));
    const r5 : Row = rcons(nw_sq, rcons(se_sq, rcons(sw_sq, rcons(ne_sq, rnil))));

    // 0-1-many heuristic, base case
    assert.deepEqual(rflip_horz(rnil), rnil);

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(rflip_horz(r1), rcons(ne_sq, rnil));

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(rflip_horz(r2), rcons(sw_sq, rnil));

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(rflip_horz(r3), rcons(sw_sq, rcons(ne_sq, rnil)));

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(rflip_horz(r4), rcons(sw_sq, rcons(nw_sq, rcons(se_sq, rnil))));
     
    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(rflip_horz(r5), rcons(nw_sq, rcons(se_sq, rcons(sw_sq, rcons(ne_sq, rnil)))));
  });

  it('qflip_horz', function() {
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
    assert.deepEqual(qflip_horz(qnil), qnil);

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(qflip_horz(q1), qcons(rcons(sw_sq, rnil), qnil));

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(qflip_horz(q2), qcons(rcons(ne_sq, rnil), qnil));

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(qflip_horz(q3), 
                      qcons(rcons(se_sq, rcons(sw_sq, rnil)), qcons(rcons(ne_sq, rcons(nw_sq, rnil)), qnil)));

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(qflip_horz(q4), 
                      qcons(rcons(se_sq, rcons(sw_sq, rnil)), qcons(rcons(ne_sq, rcons(nw_sq, rnil)), 
                            qcons(rcons(nw_sq, rcons(se_sq, rnil)), qnil))));
     
    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(qflip_horz(q5), 
                      qcons(rcons(se_sq, rcons(sw_sq, rnil)) , qcons(rcons(ne_sq, rcons(nw_sq, rnil)), 
                            qcons(rcons(nw_sq, rcons(se_sq, rnil)), qcons(rcons(sw_sq, rcons(ne_sq, rnil)), qnil)))));
  });

  const nw_sq: Square = {corner: NW, color: GREEN, shape: ROUND};
  const ne_sq: Square = {corner: NE, color: GREEN, shape: ROUND};
  const se_sq: Square = {corner: SE, color: GREEN, shape: ROUND};
  const sw_sq: Square = {corner: SW, color: GREEN, shape: ROUND};

  it('sew', function() {
    const r1 = rcons(nw_sq, rcons(ne_sq, rnil));
    const r2 = rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rcons(ne_sq, rnil))));
    assert.deepEqual(sew(qnil, qnil), qnil);
    assert.deepEqual(sew(qcons(r1, qnil), qcons(r1, qnil)), qcons(r2, qnil));
    assert.deepEqual(
        sew(qcons(r1, qcons(r1, qnil)), qcons(r1, qcons(r1, qnil))),
        qcons(r2, qcons(r2, qnil)));
  });

  it('symmetrize', function() {
    assert.deepEqual(symmetrize(qnil), qnil);
    assert.deepEqual(symmetrize(qcons(rcons(nw_sq, rnil), qnil)),
        qcons(rcons(nw_sq, rcons(ne_sq, rnil)),
            qcons(rcons(sw_sq, rcons(se_sq, rnil)), qnil)));

    const r1 = rcons(nw_sq, rcons(ne_sq, rnil));
    assert.deepEqual(symmetrize(qcons(r1, qnil)),
        qcons(
            rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rcons(ne_sq, rnil)))),
            qcons(
                rcons(sw_sq, rcons(se_sq, rcons(sw_sq, rcons(se_sq, rnil)))),
                qnil)));

    const r2 = rcons(sw_sq, rcons(se_sq, rnil));
    assert.deepEqual(symmetrize(qcons(r1, qcons(r2, qnil))),
        qcons(
            rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rcons(ne_sq, rnil)))),
            qcons(
                rcons(sw_sq, rcons(se_sq, rcons(sw_sq, rcons(se_sq, rnil)))),
                qcons(
                    rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rcons(ne_sq, rnil)))),
                    qcons(
                        rcons(sw_sq, rcons(se_sq, rcons(sw_sq, rcons(se_sq, rnil)))),
                        qnil)))));
  });

});
