import type { DyadicFloat } from './dyadic-float.js';
import { dfIsZero } from './is-zero.js';
import { dfMantissaBitLength } from './mantissa-bit-length.js';
import { dfAlign } from './align.js';
import { dfCompareMagnitudeAligned } from './compare-magnitude-aligned.js';


/**
 * Returns the sign of `x`, i.e. `-1`, `0` or `1`.
 */
function dfSign(x: DyadicFloat): number {
    return dfIsZero(x) ? 0 : (x.sign === 1 ? -1 : 1);
}


/**
 * Returns `-1`, `0` or `1` if `a < b`, `a === b` or `a > b` respectively.
 *
 * * **precondition:** `a` and `b` must be normalized (as returned by all
 * functions in this library, or see `dfNormalize`)
 */
function dfCompare(
        a: DyadicFloat,
        b: DyadicFloat): number {

    const sa = dfSign(a);
    const sb = dfSign(b);
    if (sa !== sb) { return sa < sb ? -1 : 1; }
    if (sa === 0) { return 0; }  // both zero

    // Same nonzero sign: compare magnitudes, first by the position of the
    // most significant bit (cheap), then limb by limb after aligning.
    const topA = a.exp + dfMantissaBitLength(a.mantissa);
    const topB = b.exp + dfMantissaBitLength(b.mantissa);
    let cmp: number;
    if (topA !== topB) {
        cmp = topA < topB ? -1 : 1;
    } else {
        const { ma, mb } = dfAlign(a, b);
        cmp = dfCompareMagnitudeAligned(ma, mb);
    }

    return cmp === 0 ? 0 : sa * cmp;  // (avoid returning -0)
}


export { dfSign, dfCompare }
