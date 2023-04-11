import * as assert from 'assert';
import { NW, GREEN, ROUND, Square, Row, rnil, rcons, qnil, qcons, RED, STRAIGHT, SE } from './quilt';
import { PatternA, BadArgument } from './patterns';


describe('patterns', function() {

  const nw_round_green: Square = {shape: ROUND, color: GREEN, corner: NW};
  const nw_round_red: Square = {shape: ROUND, color: RED, corner: NW};
  const nw_straight_green : Square = {shape: STRAIGHT, color : GREEN, corner : NW};
  const nw_straight_red : Square = {shape: STRAIGHT, color : RED, corner : NW};

  const se_round_green: Square = {shape: ROUND, color: GREEN, corner: SE};
  const se_round_red: Square = {shape: ROUND, color: RED, corner: SE};
  const se_straight_green : Square = {shape: STRAIGHT, color : GREEN, corner : SE};
  const se_straight_red : Square = {shape: STRAIGHT, color : RED, corner : SE};



  it('PatternA', function() {
    const row_green: Row = rcons(nw_round_green, rcons(nw_round_green, rnil));
    const row_red: Row = rcons(nw_round_red, rcons(nw_round_red, rnil));

    // Subdomain n < 0, bad argument test 1
    assert.throws(() => PatternA(-1, GREEN), BadArgument);

    // Subdomain n < 0, bad argument test 2
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

  });


});
