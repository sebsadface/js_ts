import { Color, GREEN, NE, NW, Quilt, ROUND, Row, SE, STRAIGHT, SW, Square, qconcat, qcons, qnil, rcons, rnil } from './quilt';

/** Thrown when a bad argument value is passed in. */
export class BadArgument extends Error {
  constructor(name: string, problem: string) {
    super(`bad argument "${name}": ${problem}`);

    Object.setPrototypeOf(this, BadArgument.prototype); // Ignore this
  }
}

/** Returns a quilt in pattern "A". */
export function PatternA(color_op? : Color): Quilt {
  const color : Color = (color_op === undefined) ? GREEN : color_op;
  const square2 : Square = {shape: ROUND, color : color, corner : NW};
  const row4 : Row = rcons(square2, rcons(square2, rnil));
  return qcons(row4, qcons(row4, qcons(row4, qcons(row4, qnil))));
}

/** Returns a quilt in pattern "B". */
export function PatternB(color_op? : Color): Quilt {
  const color : Color = (color_op === undefined) ? GREEN : color_op;
  const square5 : Square = {shape: STRAIGHT, color : color, corner : SE};
  const square6 : Square = {shape: STRAIGHT, color : color, corner : NW};
  const row1 : Row = rcons(square5, rcons(square6, rnil));
  return qcons(row1, qcons(row1, qcons(row1, qcons(row1, qnil))));
}

/** Returns a quilt in pattern "C". */
export function PatternC(color_op? : Color): Quilt {
  const color : Color = (color_op === undefined) ? GREEN : color_op;
  const square1 : Square = {shape: ROUND, color : color, corner : NE};
  const square2 : Square = {shape: ROUND, color : color, corner : NW};
  const square3 : Square = {shape: ROUND, color : color, corner : SE};
  const square4 : Square = {shape: ROUND, color : color, corner : SW};
  const row2 : Row = rcons(square1, rcons(square2, rnil));
  const row3 : Row = rcons(square3, rcons(square4, rnil));
  const quilt : Quilt = qcons(row3, qcons(row2, qnil));
  return qconcat(qcons(row2, qnil), qconcat(quilt, qcons(row3, qnil)))
}

/** Returns a quilt in pattern "D". */
export function PatternD(color_op? : Color): Quilt {
  const color : Color = (color_op === undefined) ? GREEN : color_op;
  const square1 : Square = {shape: ROUND, color : color, corner : NE};
  const square2 : Square = {shape: ROUND, color : color, corner : NW};
  const square3 : Square = {shape: ROUND, color : color, corner : SE};
  const square4 : Square = {shape: ROUND, color : color, corner : SW};
  const row2 : Row = rcons(square1, rcons(square2, rnil));
  const row3 : Row = rcons(square3, rcons(square4, rnil));
  const quilt : Quilt = qcons(row3, qcons(row2, qnil));
  return qconcat(quilt, quilt);
}

/** Returns a quilt in pattern "E". */
export function PatternE(color_op? : Color): Quilt {
  const color : Color = (color_op === undefined) ? GREEN : color_op;
  const square5 : Square = {shape: STRAIGHT, color : color, corner : SE};
  const square6 : Square = {shape: STRAIGHT, color : color, corner : NW};
  const row1 : Row = rcons(square5, rcons(square6, rnil));
  const row5 : Row = rcons(square6, rcons(square5, rnil));
  return qcons(row5, qcons(row1, qcons(row5, qcons(row1, qnil))));
}
