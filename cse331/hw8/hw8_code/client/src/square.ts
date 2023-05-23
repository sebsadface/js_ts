import { List, nil } from './list';


export type Color = "white" | "red" | "orange" | "yellow" | "green" | "blue" | "purple";

export type Square =
    | {readonly kind: "solid", readonly color: Color}
    | {readonly kind: "split", readonly nw: Square, readonly ne: Square,
       readonly sw: Square, readonly se: Square};

export function solid(color: Color): Square {
  return {kind: "solid", color: color};
}

export function split(nw: Square, ne: Square, sw: Square, se: Square): Square {
  return {kind: "split", nw: nw, ne: ne, sw: sw, se: se};
}


/** Returns JSON describing the given Square. */
export function toJson(sq: Square): any {
  if (sq.kind === "solid") {
    return sq.color;
  } else {
    return [toJson(sq.nw), toJson(sq.ne), toJson(sq.sw), toJson(sq.se)];
  }
}

/** Converts a JSON description to the Square it describes. */
export function fromJson(data: any): Square {
  if (typeof data === 'string') {
    switch (data) {
      case "white": case "red": case "orange": case "yellow":
      case "green": case "blue": case "purple":
        return solid(data);

      default:
        throw new Error(`unknown color "${data}"`);
    }
  } else if (Array.isArray(data)) {
    if (data.length === 4) {
      return split(fromJson(data[0]), fromJson(data[1]),
                   fromJson(data[2]), fromJson(data[3]));
    } else {
      throw new Error('split must have 4 parts');
    }
  } else {
    throw new Error(`type ${typeof data} is not a valid square`);
  }
}


/** Indicates one of the four parts of a split. */
export type Dir = "NW" | "NE" | "SE" | "SW";

/** Describes how to get to a square from the root of the tree. */
export type Path = List<Dir>;

/**
 * Returns the square at the given path in the given square.
 * @param sq the square to retrieve from
 * @param path the path to the root
 * @returns the root of the subtree at the given path
 * @requires path is a valid path to a square in sq
 */
export function retrieveSq(sq: Square, path: Path): Square {
  if (path === nil) {
    return sq;
  } else if (sq.kind === "solid") {
    throw new Error(`invalid path ${path}`);
  } else {
    switch (path.hd) {
      case 'NE': return retrieveSq(sq.ne, path.tl);
      case 'NW': return retrieveSq(sq.nw, path.tl);
      case 'SE': return retrieveSq(sq.se, path.tl);
      case 'SW': return retrieveSq(sq.sw, path.tl);
    }
  }
}


/**
 * Returns a new square with sq1 at the given path replaced by the
 * given sq2.
 * @param sq1 the square whose root will be replaced
 * @param path the path to the root to replace
 * @param sq2 the square to replace the root of sq1 with
 * @returns a new square the same as sq1 except with sq2 at the given path
 * @requires path is a valid path to a square in sq1
 */
export function replaceSq(sq1: Square, path: Path, sq2: Square): Square {
  if (path === nil) {
    return sq2;
  } else if (sq1.kind === "solid") {
    throw new Error(`invalid path ${path}`);
  } else {
    switch (path.hd) {
      case 'NW': return split(replaceSq(sq1.nw, path.tl, sq2), sq1.ne, sq1.sw, sq1.se);
      case 'NE': return split(sq1.nw, replaceSq(sq1.ne, path.tl, sq2), sq1.sw, sq1.se);
      case 'SW': return split(sq1.nw, sq1.ne, replaceSq(sq1.sw, path.tl, sq2), sq1.se);
      case 'SE': return split(sq1.nw, sq1.ne, sq1.sw, replaceSq(sq1.se, path.tl, sq2))
    }
  }
}