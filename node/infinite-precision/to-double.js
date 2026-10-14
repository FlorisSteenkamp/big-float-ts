import { dfIsZero } from './is-zero.js';
import { dfMantissaBitLength } from './mantissa-bit-length.js';
import { dfGetBit } from './get-bit.js';
import { dfLowBitsSet } from './low-bits-set.js';
import { ldexp } from './helpers/ldexp.js';
import { dfExtractBits } from './helpers/extract-bits.js';
/**
 * Convert to the nearest JS double using round-to-nearest, ties-to-even.
 * Overflows to ±Infinity and underflows to ±0 as IEEE-754 dictates.
 * Assumes `x` is normalized.
 */
function dfToDouble(x) {
    if (dfIsZero(x)) {
        return 0;
    }
    const m = x.mantissa;
    const bitlen = dfMantissaBitLength(m);
    // Number of low bits to discard so the kept significand fits in 53 bits
    // and, for subnormal results, so that its lsb is not below 2^-1074. Doing
    // the subnormal reduction here (rather than letting `ldexp` round again)
    // avoids double rounding.
    const shift = Math.max(0, bitlen - 53, -1074 - x.exp);
    // Build q = floor(M / 2^shift) (at most 53 bits => exact in a double).
    let q = dfExtractBits(m, shift, bitlen - shift);
    let e2 = x.exp + shift;
    if (shift > 0) {
        // Round-to-nearest, ties-to-even on the discarded low `shift` bits.
        const roundBit = dfGetBit(m, shift - 1);
        const sticky = dfLowBitsSet(m, shift - 1);
        if (roundBit === 1 && (sticky || q % 2 === 1)) {
            q += 1;
            if (q === 2 ** 53) {
                // Mantissa carried out of 53 bits; renormalize.
                q /= 2;
                e2 += 1;
            }
        }
    }
    const magnitude = ldexp(q, e2);
    return x.sign === 1 ? -magnitude : magnitude;
}
export { dfToDouble };
//# sourceMappingURL=to-double.js.map