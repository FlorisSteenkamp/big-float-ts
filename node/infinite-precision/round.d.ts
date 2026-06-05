import type { DyadicFloat } from './dyadic-float.js';
/**
 * Limit a DyadicFloat to at most `prec` significant mantissa bits using
 * round-to-nearest, ties-to-even.
 *
 * Unlike `truncate` (which always rounds toward zero), this keeps the closest
 * representable value with `prec` significant bits, breaking exact halfway
 * cases toward the even mantissa. The error is therefore at most half an ulp
 * of the retained precision.
 *
 * Values already within `prec` bits are returned unchanged (copied).
 *
 * @param x a `DyadicFloat`
 * @param prec maximum number of significant mantissa bits (must be positive)
 */
declare function dfRound(x: DyadicFloat, prec: number): DyadicFloat;
export { dfRound };
