import type { DyadicFloat } from './dyadic-float.js';
/**
 * Convert a DyadicFloat to a Shewchuk floating-point expansion.
 *
 * The returned array is a compressed (nonoverlapping and nonadjacent)
 * expansion, sorted in order of increasing magnitude, whose exact sum equals
 * the value of `x`. The conversion is exact as long as every component is
 * within the double range, i.e. it is subject to overflow (to ±Infinity) and
 * underflow (loss of low bits).
 *
 * The integer significand is sliced into successive 53-bit windows; each
 * nonzero window becomes one component scaled by the appropriate power of two.
 * Because the windows occupy disjoint bit ranges, the components are
 * nonoverlapping by construction. Adjacent windows may however produce
 * adjacent components (which `fastExpansionSum` does not allow), so the
 * result is compressed.
 *
 * A zero value yields `[0]`.
 *
 * @param x a normalized DyadicFloat
 */
declare function dfToExpansion(x: DyadicFloat): number[];
export { dfToExpansion };
