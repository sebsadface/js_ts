import { Quilt, qnil } from './quilt';


/** Thrown when a bad argument value is passed in. */
export class BadArgument extends Error {
  constructor(name: string, problem: string) {
    super(`bad argument "${name}": ${problem}`);

    Object.setPrototypeOf(this, BadArgument.prototype); // Ignore this
  }
}


/** Returns a quilt in pattern "A". */
export function PatternA(): Quilt {
  return qnil;  // TODO: replace
}

/** Returns a quilt in pattern "B". */
export function PatternB(): Quilt {
  return qnil;  // TODO: replace
}

/** Returns a quilt in pattern "C". */
export function PatternC(): Quilt {
  return qnil;  // TODO: replace
}

/** Returns a quilt in pattern "D". */
export function PatternD(): Quilt {
  return qnil;  // TODO: replace
}

/** Returns a quilt in pattern "E". */
export function PatternE(): Quilt {
  return qnil;  // TODO: replace
}
