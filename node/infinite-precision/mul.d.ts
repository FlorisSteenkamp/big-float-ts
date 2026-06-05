import type { DyadicFloat } from './dyadic-float.js';
/**
 * Multiply: a * b. Exact.
 *
 * Schoolbook O(n*m) multiply. Each partial product a[i]*b[j] < 2^52 so it is
 * exact in a double; carries are propagated as we go and finished off by
 * `normalize`.
 *
 * TODO: consider a Karatsuba threshold for large operands.
 */
declare function dfMul(a: DyadicFloat, b: DyadicFloat): DyadicFloat;
export { dfMul };
