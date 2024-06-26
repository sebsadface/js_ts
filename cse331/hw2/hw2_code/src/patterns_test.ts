import * as assert from 'assert';
import { NW, GREEN, ROUND, Square, Row, rnil, rcons, qnil, qcons, RED, STRAIGHT, SE, SW, NE } from './quilt';
import { PatternA, PatternB, PatternC, PatternD, PatternE, BadArgument } from './patterns';


describe('patterns', function() {

  const nw_round_green: Square = {shape: ROUND, color: GREEN, corner: NW};
  const nw_round_red: Square = {shape: ROUND, color: RED, corner: NW};
  const nw_straight_green : Square = {shape: STRAIGHT, color : GREEN, corner : NW};
  const nw_straight_red : Square = {shape: STRAIGHT, color : RED, corner : NW};

  const ne_round_green: Square = {shape: ROUND, color: GREEN, corner: NE};
  const ne_round_red: Square = {shape: ROUND, color: RED, corner: NE};

  const se_round_green: Square = {shape: ROUND, color: GREEN, corner: SE};
  const se_round_red: Square = {shape: ROUND, color: RED, corner: SE};
  const se_straight_green : Square = {shape: STRAIGHT, color : GREEN, corner : SE};
  const se_straight_red : Square = {shape: STRAIGHT, color : RED, corner : SE};

  const sw_round_green: Square = {shape: ROUND, color: GREEN, corner: SW};
  const sw_round_red: Square = {shape: ROUND, color: RED, corner: SW};

  it('PatternA', function() {
    const row_green: Row = rcons(nw_round_green, rcons(nw_round_green, rnil));
    const row_red: Row = rcons(nw_round_red, rcons(nw_round_red, rnil));

    // bad argument n < 0, test 1
    assert.throws(() => PatternA(-1, GREEN), BadArgument);

    // bad argument n < 0, test 2
    assert.throws(() => PatternA(-12, RED), BadArgument);


    // 0-1-many heuristic, base case
    assert.deepEqual(PatternA(0), qnil);

    // 0-1-many heuristic, 1 case, single recursive call
    assert.deepEqual(PatternA(1), qcons(row_green, qnil));

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(PatternA(3, RED),
         qcons(row_red, qcons(row_red, qcons(row_red, qnil))));

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(PatternA(4, GREEN),
         qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil)))));
     
    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(PatternA(5),
         qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil))))));

  });

  it('PatternB', function() {
    const row_green: Row = rcons(se_straight_green, rcons(nw_straight_green, rnil));
    const row_red: Row = rcons(se_straight_red, rcons(nw_straight_red, rnil));

    // bad argument n < 0, test 1
    assert.throws(() => PatternB(-3, GREEN), BadArgument);

    // bad argument n < 0, test 2
    assert.throws(() => PatternB(-24, RED), BadArgument);

    // 0-1-many heuristic, base case
    assert.deepEqual(PatternB(0), qnil);

    // 0-1-many heuristic, 1 case, single recursive call
    assert.deepEqual(PatternB(1), qcons(row_green, qnil));

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(PatternB(3, RED),
         qcons(row_red, qcons(row_red, qcons(row_red, qnil))));

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(PatternB(4, GREEN),
         qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil)))));

    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(PatternB(5),
         qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil))))));

  });

  it('PatternC', function() {
    const row_n_green: Row = rcons(ne_round_green, rcons(nw_round_green, rnil));
    const row_s_green: Row = rcons(se_round_green, rcons(sw_round_green, rnil));
    const row_n_red: Row = rcons(ne_round_red, rcons(nw_round_red, rnil));
    const row_s_red: Row = rcons(se_round_red, rcons(sw_round_red, rnil));

    // bad argument n < 0, test 1
    assert.throws(() => PatternC(-3, GREEN), BadArgument);

    // bad argument n < 0, test 2
    assert.throws(() => PatternC(-24, RED), BadArgument);

    // bad argument n % 2 !== 0, test 1
    assert.throws(() => PatternC(1, GREEN), BadArgument);

    // bad argument n % 2 !== 0, test 2
    assert.throws(() => PatternC(7, RED), BadArgument);

    // 0-1-many heuristic, base case
    assert.deepEqual(PatternC(0), qnil);

    // 0-1-many heuristic, 1 case, single recursive call
    assert.deepEqual(PatternC(2), qcons(row_n_green, qcons(row_s_green, qnil)));

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(PatternC(4, RED),
         qcons(row_n_red, qcons(row_s_red, qcons(row_n_red, qcons(row_s_red, qnil)))));

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(PatternC(6, GREEN),
         qcons(row_n_green, qcons(row_s_green, qcons(row_n_green, qcons(row_s_green, 
               qcons(row_n_green, qcons(row_s_green, qnil)))))));

     // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(PatternC(8),
         qcons(row_n_green, qcons(row_s_green, qcons(row_n_green, qcons(row_s_green, 
               qcons(row_n_green, qcons(row_s_green, qcons(row_n_green, qcons(row_s_green, qnil)))))))));

  });

  it('PatternD', function() {
    const row_n_green: Row = rcons(ne_round_green, rcons(nw_round_green, rnil));
    const row_s_green: Row = rcons(se_round_green, rcons(sw_round_green, rnil));
    const row_n_red: Row = rcons(ne_round_red, rcons(nw_round_red, rnil));
    const row_s_red: Row = rcons(se_round_red, rcons(sw_round_red, rnil));

    // bad argument n < 0, test 1
    assert.throws(() => PatternD(-1, GREEN), BadArgument);

    // bad argument n < 0, test 2
    assert.throws(() => PatternD(-8, RED), BadArgument);

    // bad argument n % 2 !== 0, test 1
    assert.throws(() => PatternD(1, GREEN), BadArgument);

    // bad argument n % 2 !== 0, test 2
    assert.throws(() => PatternD(9, RED), BadArgument);

    // 0-1-many heuristic, base case
    assert.deepEqual(PatternD(0), qnil);

    // 0-1-many heuristic, 1 case, single recursive call
    assert.deepEqual(PatternD(2), qcons(row_s_green, qcons(row_n_green, qnil)));

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(PatternD(4, RED),
         qcons(row_s_red, qcons(row_n_red, qcons(row_s_red, qcons(row_n_red, qnil)))));

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(PatternD(6, GREEN),
         qcons(row_s_green, qcons(row_n_green, qcons(row_s_green, qcons(row_n_green, 
               qcons(row_s_green, qcons(row_n_green, qnil)))))));

     // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(PatternD(8),
         qcons(row_s_green, qcons(row_n_green, qcons(row_s_green, qcons(row_n_green, 
               qcons(row_s_green, qcons(row_n_green, qcons(row_s_green, qcons(row_n_green, qnil)))))))));

  });

  it('PatternE', function() {
    const row_ns_green: Row = rcons(nw_straight_green, rcons(se_straight_green, rnil));
    const row_ns_red: Row = rcons(nw_straight_red, rcons(se_straight_red, rnil));
    const row_sn_green: Row = rcons(se_straight_green, rcons(nw_straight_green, rnil));
    const row_sn_red: Row = rcons(se_straight_red, rcons(nw_straight_red, rnil));

  // bad argument n < 0, test 1
    assert.throws(() => PatternE(-4, GREEN), BadArgument);

    // bad argument n < 0, test 2
    assert.throws(() => PatternE(-13, RED), BadArgument);

    // 0-1-many heuristic, base case 1
    assert.deepEqual(PatternE(0), qnil);

    // 0-1-many heuristic, base case 2
    assert.deepEqual(PatternE(1), qcons(row_ns_green, qnil));

    // 0-1-many heuristic, 1st 1 case, single recursive call calling base case 1
    assert.deepEqual(PatternE(2, RED), qcons(row_ns_red, qcons(row_sn_red, qnil)));

    // 0-1-many heuristic, 2nd 1 case, single recursive call calling base case 2
    assert.deepEqual(PatternE(3, GREEN), 
                     qcons(row_ns_green, qcons(row_sn_green, qcons(row_ns_green, qnil))));

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(PatternE(4, RED),
         qcons(row_ns_red, qcons(row_sn_red, qcons(row_ns_red, qcons(row_sn_red, qnil)))));

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(PatternE(5, GREEN),
         qcons(row_ns_green, qcons(row_sn_green, qcons(row_ns_green, qcons(row_sn_green, 
               qcons(row_ns_green, qnil))))));

     // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(PatternE(6),
         qcons(row_ns_green, qcons(row_sn_green, qcons(row_ns_green, qcons(row_sn_green, 
               qcons(row_ns_green, qcons(row_sn_green, qnil)))))));

     // 0-1-many heuristic, 4th many case, >1 recursive call
    assert.deepEqual(PatternE(7),
          qcons(row_ns_green, qcons(row_sn_green, qcons(row_ns_green, qcons(row_sn_green, 
               qcons(row_ns_green, qcons(row_sn_green, qcons(row_ns_green, qnil))))))));
  });
});
