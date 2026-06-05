import type { DyadicFloat } from './dyadic-float.js';
/**
 * Limit a DyadicFloat to at most `prec` significant mantissa bits by
 * truncating toward zero.
 *
 * The low bits of the mantissa are discarded and the same count is folded into
 * `exp`, so the value stays (-1)^sign * mantissa' * 2^exp' with mantissa'
 * holding at most `prec` significant bits. Because only low bits are dropped,
 * the magnitude never increases: the result is the closest representable value
 * to `x` whose magnitude does not exceed |x| (round toward zero).
 *
 * Values already within `prec` bits are returned unchanged (copied).
 *
 * @param x a `DyadicFloat`
 * @param prec maximum number of significant mantissa bits (must be positive)
 */
declare function dfTruncate(x: DyadicFloat, prec: number): DyadicFloat;
export { dfTruncate };
