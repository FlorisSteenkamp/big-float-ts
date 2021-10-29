import { getLowestSetBit, getHighestSetBit } from "../double-representation/get-max-set-bit.js";
import { exponent } from "../double-representation/exponent.js";
/**
 * Returns true if a and b overlaps, false otherwise.
 *
 * Two floating-point values x and y are nonoverlapping if the least significant
 * nonzero bit of x is more significant than the most significant nonzero bit of
 * y.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Implemented for testing purposes.
 * @param a a double
 * @param b another double
 */
function isOverlapping(a, b) {
    return !isNonOverlapping(a, b);
}
/**
 * Returns true if a and b does not overlap, false otherwise.
 *
 * Two floating-point values x and y are nonoverlapping if the least significant
 * nonzero bit of x is more significant than the most significant nonzero bit of
 * y.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Implemented for testing purposes.
 *
 * @param a A double
 * @param b Another double
 */
function isNonOverlapping(a, b) {
    if (a === 0 || b === 0) {
        return true;
    }
    if (Math.abs(b) > Math.abs(a)) {
        [a, b] = [b, a];
    }
    // At this point abs(a) > abs(b)
    let l = getLowestSetBit(a);
    let h = getHighestSetBit(b);
    let shift = exponent(a) - exponent(b);
    return (l + shift) > h;
}
/**
 * Returns true if all components of the given floating point expansion is
 * non-overlapping, false otherwise.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a double floating point expansion
 */
function isNonOverlappingAll(e) {
    for (let i = 1; i < e.length; i++) {
        if (isOverlapping(e[i - 1], e[i])) {
            return false;
        }
    }
    return true;
}
export { isOverlapping, isNonOverlapping, isNonOverlappingAll };
//# sourceMappingURL=is-overlapping.js.map