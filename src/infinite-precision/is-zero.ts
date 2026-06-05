import type { DyadicFloat } from './dyadic-float.js';


/**
 * Returns `true` if `x` represents the `DyadicFloat` value zero,
 * `false` otherwise.
 */
function dfIsZero(x: DyadicFloat): boolean {
    return x.mantissa.length === 0;
}

export { dfIsZero }
