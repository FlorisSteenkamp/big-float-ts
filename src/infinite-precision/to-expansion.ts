import type { DyadicFloat } from './dyadic-float.js';
import { dfIsZero } from './is-zero.js';
import { dfMantissaBitLength } from './mantissa-bit-length.js';
import { dfExtractBits } from './helpers/extract-bits.js';
import { ldexp } from './helpers/ldexp.js';
import { eCompress } from '../double-expansion/e-compress.js';


/** Bits packed into each expansion component (a double holds 53). */
const CHUNK_BITS = 53;


/**
 * Convert a DyadicFloat to a Shewchuk floating-point expansion.
 *
 * The returned array is a compressed (nonoverlapping and nonadjacent)
 * expansion, sorted in order of increasing magnitude, whose exact sum equals
 * the value of `x`. The conversion is exact as long as every component is
 * within the double range, i.e. it is subject to overflow (to ±Infinity) and
 * underflow (loss of low bits).
 *
 * The integer significand is sliced into successive 53-bit windows; each
 * nonzero window becomes one component scaled by the appropriate power of two.
 * Because the windows occupy disjoint bit ranges, the components are
 * nonoverlapping by construction. Adjacent windows may however produce
 * adjacent components (which `fastExpansionSum` does not allow), so the
 * result is compressed.
 *
 * A zero value yields `[0]`.
 *
 * @param x a normalized DyadicFloat
 */
function dfToExpansion(x: DyadicFloat): number[] {
    if (dfIsZero(x)) { return [0]; }

    const m = x.mantissa;
    const bitlen = dfMantissaBitLength(m);
    const negative = x.sign === 1;

    const e: number[] = [];
    for (let start = 0; start < bitlen; start += CHUNK_BITS) {
        const count = Math.min(CHUNK_BITS, bitlen - start);

        // Build this window's bits as an exact integer in [0, 2^53).
        const q = dfExtractBits(m, start, count);
        if (q === 0) { continue; } // skip empty windows

        const component = ldexp(q, x.exp + start);
        e.push(negative ? -component : component);
    }

    // The significand was nonzero, but every window could round to a zero
    // double on underflow; keep the contract of returning a valid expansion.
    if (e.length === 0) { return [0]; }

    return eCompress(e);
}


export { dfToExpansion }
