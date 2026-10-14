/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 19 (Shewchuk): Let e = sum_(i=1)^m(e_i) be a nonoverlapping expansion
 * of m p-bit components, and const b be a p-bit value where p >= 4. Suppose that
 * the components of e are sorted in order of increasing magnitude, except that
 * any of the e_i may be zero. Then the following algorithm will produce a
 * nonoverlapping expansion h such that h = sum_(i=1)^(2m)(h_i) = be, where the
 * components of h are also in order of increasing magnitude, except that any of
 * the h_i may be zero. Furthermore, if e is nonadjacent and round-to-even
 * tiebreaking is used, then h is non-adjacent.
 *
 * * the primitives (`twoProduct`, `twoSum`, `fastTwoSum`) are inlined for
 * performance - calling them is 2-7x slower due to the arrays they return
 * * zero components are eliminated from the result
 * * subject to the same overflow / underflow limits as `twoProduct` (e.g.
 * NaN results for components or `b` with magnitude > ~2^996)
 *
 * @param e a double floating point expansion
 * @param b a double
 */
declare function scaleExpansion(e: number[], b: number): number[];
/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * identical to `scaleExpansion` but with the parameters swapped
 *
 * @param b a double
 * @param e a double floating point expansion
 */
declare function scaleExpansion2(b: number, e: number[]): number[];
export { scaleExpansion, scaleExpansion2 };
