import type { DyadicFloat } from './dyadic-float.js';
/**
 * Build a DyadicFloat from a JS double. Exact for all finite doubles
 * (including subnormals and ±0). Throws on NaN / ±Infinity.
 */
declare function dfFromDouble(v: number): DyadicFloat;
export { dfFromDouble };
