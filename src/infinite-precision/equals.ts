import type { DyadicFloat } from './dyadic-float.js';


/**
 * Returns `true` if `a` and `b` represent the same value, `false` otherwise.
 *
 * * **precondition:** `a` and `b` must be normalized (as returned by all
 * functions in this library, or see `dfNormalize`) - the normalized
 * representation is unique so a structural comparison suffices
 */
function dfEquals(
        a: DyadicFloat,
        b: DyadicFloat): boolean {

    if (a.sign !== b.sign || a.exp !== b.exp) { return false; }

    const ma = a.mantissa;
    const mb = b.mantissa;
    if (ma.length !== mb.length) { return false; }
    for (let i = 0; i < ma.length; i++) {
        if (ma[i] !== mb[i]) { return false; }
    }

    return true;
}


export { dfEquals }
