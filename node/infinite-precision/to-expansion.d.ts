import type { DyadicFloat } from './dyadic-float.js';
/**
 * Convert a DyadicFloat to a Shewchuk floating-point expansion.
 *
 * The returned array is a nonoverlapping expansion, sorted in order of
 * increasing magnitude, whose exact sum equals the value of `x`. The
 * conversion is exact (the dyadic value and the expansion's sum are equal).
 *
 * The integer significand is sliced into successive 53-bit windows; each
 * nonzero window becomes one component scaled by the appropriate power of two.
 * Because the windows occupy disjoint bit ranges, the components are
 * nonoverlapping by construction.
 *
 * A zero value yields `[0]`.
 *
 * @param x a normalized DyadicFloat
 */
declare function dfToExpansion(x: DyadicFloat): number[];
export { dfToExpansion };
