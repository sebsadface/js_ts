import * as assert from 'assert';
import { NW, NE, SW, SE, GREEN, ROUND, Square, rnil, rcons, qnil, qcons } from './quilt';
import { sew, symmetrize } from './quilt_ops';


describe('quilt_ops', function() {

  it('sflip_vert', function() {
    // TODO: implement
  });

  it('rflip_vert', function() {
    // TODO: implement
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
