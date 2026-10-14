import type { DyadicFloat } from './dyadic-float.js';
/**
 * Returns `true` if `a` and `b` represent the same value, `false` otherwise.
 *
 * * **precondition:** `a` and `b` must be normalized (as returned by all
 * functions in this library, or see `dfNormalize`) - the normalized
 * representation is unique so a structural comparison suffices
 */
declare function dfEquals(a: DyadicFloat, b: DyadicFloat): boolean;
export { dfEquals };
