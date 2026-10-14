import type { DyadicFloat } from './dyadic-float.js';
/**
 * Returns the sign of `x`, i.e. `-1`, `0` or `1`.
 */
declare function dfSign(x: DyadicFloat): number;
/**
 * Returns `-1`, `0` or `1` if `a < b`, `a === b` or `a > b` respectively.
 *
 * * **precondition:** `a` and `b` must be normalized (as returned by all
 * functions in this library, or see `dfNormalize`)
 */
declare function dfCompare(a: DyadicFloat, b: DyadicFloat): number;
export { dfSign, dfCompare };
