import type { DyadicFloat } from '../infinite-precision/dyadic-float.js';
/**
 * Convert a Shewchuk floating-point expansion to a DyadicFloat.
 *
 * The expansion's exact value is the sum of its components; this conversion is
 * exact since every finite double is an exact dyadic number and dyadic
 * addition is closed and exact.
 *
 * The components need not be nonoverlapping or sorted — any array of finite
 * doubles is accepted and its exact sum is returned.
 *
 * @param e a floating point expansion
 */
declare function toDyadicFloat(e: number[]): DyadicFloat;
export { toDyadicFloat };
