import { Color, GREEN, NE, NW, Quilt, ROUND, Row, SE, STRAIGHT, SW, Square, qcons, qnil, rcons, rnil } from './quilt';

/** Thrown when a bad argument value is passed in. */
export class BadArgument extends Error {
  constructor(name: string, problem: string) {
    super(`bad argument "${name}": ${problem}`);

    Object.setPrototypeOf(this, BadArgument.prototype); // Ignore this
  }
}

/** Returns a quilt in pattern "A". */
export function PatternA(n: number, c? : Color): Quilt {
  if (n < 0) {
    throw new BadArgument("Bad n", "Expected n >= 0, but got n < 0");
  }

  const color : Color = (c === undefined) ? GREEN : c;
  const s : Square = {shape: ROUND, color : color, corner : NW};
  const s_s : Row = rcons(s, rcons(s, rnil));
  
  if (n === 0) {
    return qnil;
  } else {
    return qcons(s_s, PatternA(n - 1, c));
  }
}

/** Returns a quilt in pattern "B". */
export function PatternB(n : number, c? : Color): Quilt {
  if (n < 0) {
    throw new BadArgument("Bad n", "Expected n >= 0, but got n < 0");
  }

  const color : Color = (c === undefined) ? GREEN : c;
  const s : Square = {shape: STRAIGHT, color : color, corner : SE};
  const t : Square = {shape: STRAIGHT, color : color, corner : NW};
  const s_t : Row = rcons(s, rcons(t, rnil));
  
  if (n === 0) {
    return qnil;
  } else {
    return qcons(s_t, PatternB(n - 1, c));
  }
}

/** Returns a quilt in pattern "C". */
export function PatternC(n : number, c? : Color): Quilt {
  if (n < 0 || n % 2 !== 0) {
    throw new BadArgument("Bad n", "Expected n >= 0 and n % 2 = 0, but got n < 0 or n % 2 != 0");
  }

  const color : Color = (c === undefined) ? GREEN : c;
  const s : Square = {shape: ROUND, color : color, corner : NE};
  const t : Square = {shape: ROUND, color : color, corner : NW};
  const u : Square = {shape: ROUND, color : color, corner : SE};
  const v : Square = {shape: ROUND, color : color, corner : SW};
  const s_t : Row = rcons(s, rcons(t, rnil));
  const u_v : Row = rcons(u, rcons(v, rnil));

  if (n === 0) {
    return qnil;
  } else {
    return qcons(s_t, qcons(u_v, PatternC(n - 2, c)));
  }
}

/** Returns a quilt in pattern "D". */
export function PatternD(n : number, c? : Color): Quilt {
  if (n < 0 || n % 2 !== 0) {
    throw new BadArgument("Bad n", "Expected n >= 0 and n % 2 = 0, but got n < 0 or n % 2 != 0");
  }

  const color : Color = (c === undefined) ? GREEN : c;
  const s : Square = {shape: ROUND, color : color, corner : SE};
  const t : Square = {shape: ROUND, color : color, corner : SW};
  const u : Square = {shape: ROUND, color : color, corner : NE};
  const v : Square = {shape: ROUND, color : color, corner : NW};
  const s_t : Row = rcons(s, rcons(t, rnil));
  const u_v : Row = rcons(u, rcons(v, rnil));

  if (n === 0){
    return qnil;
  } else {
    return qcons(s_t, qcons(u_v, PatternD(n - 2, c)));
  }
}

/** Returns a quilt in pattern "E". */
export function PatternE(n : number, c? : Color): Quilt {
  if (n < 0) {
    throw new BadArgument("Bad n", "Expected n >= 0, but got n < 0");
  }

  const color : Color = (c === undefined) ? GREEN : c;
  const s : Square = {shape: STRAIGHT, color : color, corner : NW};
  const t : Square = {shape: STRAIGHT, color : color, corner : SE};
  const u : Square = {shape: STRAIGHT, color : color, corner : SE};
  const v : Square = {shape: STRAIGHT, color : color, corner : NW};
  const s_t : Row = rcons(s, rcons(t, rnil));
  const u_v : Row = rcons(u, rcons(v, rnil));

  if (n === 0) {
    return qnil;
  } else if (n === 1) {
    return qcons(s_t, qnil);
  } else {
    return qcons(s_t, qcons(u_v, PatternE(n - 2, c)));
  }
}
