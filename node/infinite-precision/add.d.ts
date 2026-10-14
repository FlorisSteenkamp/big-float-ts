import type { DyadicFloat } from './dyadic-float.js';
/**
 * Adds two dyadic floats: a + b.
 * * Exact
 * * Both operands are first aligned to the smaller exponent so the cost (time
 * and memory) is proportional to the difference in exponents, e.g. adding
 * `2^(10^9)` and `1` allocates a mantissa of about 38 million limbs.
 */
declare function dfAdd(a: DyadicFloat, b: DyadicFloat): DyadicFloat;
export { dfAdd };
