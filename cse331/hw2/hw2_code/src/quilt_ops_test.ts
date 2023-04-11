import * as assert from 'assert';
import { NW, NE, SW, SE, GREEN, ROUND, Square, rnil, rcons, qnil, qcons, Row } from './quilt';
import { rflip_vert, sew, sflip_vert, symmetrize } from './quilt_ops';


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

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(rflip_vert(r2), rcons(nw_sq, rnil));

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(rflip_vert(r3), rcons(sw_sq, rcons(se_sq, rnil)));

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(rflip_vert(r4), rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rnil))));
     
    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(rflip_vert(r5), rcons(sw_sq, rcons(se_sq, rcons(sw_sq, rcons(se_sq, rnil)))));
  });

  it('qflip_vert', function() {
    // TODO: implement
  });

  it('sflip_horz', function() {
    // TODO: implement
  });

  it('rflip_horz', function() {
    // TODO: implement
  });

  it('qflip_horz', function() {
    // TODO: implement
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
