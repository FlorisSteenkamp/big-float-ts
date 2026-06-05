import { LIMB_BASE } from './dyadic-float.js';
import { dfNormalize } from './helpers/normalize.js';
import { DF_ZERO } from './zero.js';
const _scratch = new DataView(new ArrayBuffer(8));
/**
 * Build a DyadicFloat from a JS double. Exact for all finite doubles
 * (including subnormals and ±0). Throws on NaN / ±Infinity.
 */
function dfFromDouble(v) {
    if (v === 0)
        return DF_ZERO; // covers +0 and -0
    _scratch.setFloat64(0, v);
    const hi = _scratch.getUint32(0);
    const lo = _scratch.getUint32(4);
    const sign = hi >>> 31;
    const expField = (hi >>> 20) & 0x7ff;
    const fracHigh = hi & 0xfffff; // low 20 bits of the high word
    if (expField === 0x7ff) {
        throw new Error('fromNumber: value must be finite');
    }
    // 52-bit fraction as an exact integer (fracHigh < 2^20, lo < 2^32).
    const frac = fracHigh * 2 ** 32 + lo;
    // value = (-1)^sign * mantissaInt * 2^e2
    let mantissaInt;
    let e2;
    if (expField === 0) {
        // Subnormal: no hidden bit, biased exponent treated as 1.
        mantissaInt = frac;
        e2 = -1074;
    }
    else {
        // Normal: add the hidden leading 1 bit.
        mantissaInt = frac + 2 ** 52;
        e2 = expField - 1075; // (expField - 1023) - 52
    }
    // Split the (<= 53-bit) significand into base-2^26 limbs; normalize fixes
    // the high limb (which may be >= LIMB_BASE) via carry propagation.
    const low = mantissaInt % LIMB_BASE;
    const high = Math.floor(mantissaInt / LIMB_BASE);
    return dfNormalize({ sign, mantissa: [low, high], exp: e2 });
}
export { dfFromDouble };
//# sourceMappingURL=from-double.js.map