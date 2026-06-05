import type { DyadicFloat } from './dyadic-float.js';
import { dfIsZero } from './is-zero.js';
import { dfMantissaBitLength } from './mantissa-bit-length.js';
import { dfShiftRight } from './shift-right.js';
import { dfNormalize } from './helpers/normalize.js';
import { DF_ZERO } from './zero.js';


/**
 * Limit a DyadicFloat to at most `prec` significant mantissa bits by
 * truncating toward zero.
 *
 * The low bits of the mantissa are discarded and the same count is folded into
 * `exp`, so the value stays (-1)^sign * mantissa' * 2^exp' with mantissa'
 * holding at most `prec` significant bits. Because only low bits are dropped,
 * the magnitude never increases: the result is the closest representable value
 * to `x` whose magnitude does not exceed |x| (round toward zero).
 *
 * Values already within `prec` bits are returned unchanged (copied).
 *
 * @param x a `DyadicFloat`
 * @param prec maximum number of significant mantissa bits (must be positive)
 */
function dfTruncate(
        x: DyadicFloat,
        prec: number): DyadicFloat {

    if (dfIsZero(x)) { return DF_ZERO; }

    const bitlen = dfMantissaBitLength(x.mantissa);
    if (bitlen <= prec) {
        return { sign: x.sign, mantissa: x.mantissa.slice(), exp: x.exp };
    }

    const shift = bitlen - prec;

    return dfNormalize({
        sign: x.sign,
        mantissa: dfShiftRight(x.mantissa, shift),
        exp: x.exp + shift
    });
}


export { dfTruncate }
