import type { DyadicFloat } from './dyadic-float.js';
/**
 * Convert to the nearest JS double using round-to-nearest, ties-to-even.
 * Overflows to ±Infinity and underflows to ±0 as IEEE-754 dictates.
 * Assumes `x` is normalized.
 */
declare function dfToDouble(x: DyadicFloat): number;
export { dfToDouble };
