import { dfIsZero } from './is-zero.js';
import { dfMantissaBitLength } from './mantissa-bit-length.js';
import { dfGetBit } from './get-bit.js';
import { dfLowBitsSet } from './low-bits-set.js';
import { dfShiftRight } from './shift-right.js';
import { dfNormalize } from './helpers/normalize.js';
import { DF_ZERO } from './zero.js';
/**
 * Limit a DyadicFloat to at most `prec` significant mantissa bits using
 * round-to-nearest, ties-to-even.
 *
 * Unlike `truncate` (which always rounds toward zero), this keeps the closest
 * representable value with `prec` significant bits, breaking exact halfway
 * cases toward the even mantissa. The error is therefore at most half an ulp
 * of the retained precision.
 *
 * Values already within `prec` bits are returned unchanged (copied).
 *
 * @param x a `DyadicFloat`
 * @param prec maximum number of significant mantissa bits (must be positive)
 */
function dfRound(x, prec) {
    if (dfIsZero(x)) {
        return DF_ZERO;
    }
    const m = x.mantissa;
    const bitlen = dfMantissaBitLength(m);
    if (bitlen <= prec) {
        return { sign: x.sign, mantissa: m.slice(), exp: x.exp };
    }
    const shift = bitlen - prec;
    const kept = dfShiftRight(m, shift);
    // Round-to-nearest, ties-to-even on the discarded low `shift` bits.
    const roundBit = dfGetBit(m, shift - 1);
    const sticky = dfLowBitsSet(m, shift - 1);
    const keptIsOdd = dfGetBit(m, shift) === 1;
    if (roundBit === 1 && (sticky || keptIsOdd)) {
        kept[0] = (kept[0] ?? 0) + 1; // normalize propagates the carry
    }
    // Note: rounding up can carry out of the top bit (e.g. 0b111 -> 0b1000),
    // but the mantissa is then a power of 2 which `dfNormalize` reduces to 1
    // (factoring its zero bits into `exp`) so at most `prec` bits remain.
    return dfNormalize({ sign: x.sign, mantissa: kept, exp: x.exp + shift });
}
export { dfRound };
//# sourceMappingURL=round.js.map