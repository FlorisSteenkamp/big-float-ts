/**
 * Return the result of multiplying together an array of floating point
 * expansions.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param term an array of multiplicands
 */
declare function eProduct(term: number[][]): number[];
/**
 * Returns the same as `eProduct` but without compressing the result.
 *
 * * not exported from the package - used by `eCalculate` (which sums the
 * products before compression is useful)
 *
 * @param term an array of multiplicands
 */
declare function eProductUncompressed(term: number[][]): number[];
export { eProduct, eProductUncompressed };
