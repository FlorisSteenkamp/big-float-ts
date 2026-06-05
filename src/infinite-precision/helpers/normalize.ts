import { LIMB_BASE, LIMB_BITS } from '../dyadic-float.js';
import type { DyadicFloat } from '../dyadic-float.js';


/**
 * Reduce a DyadicFloat to canonical form, in place:
 *  - propagate any carries so every limb is in [0, LIMB_BASE),
 *  - drop high-order zero limbs,
 *  - factor out trailing zero limbs into `exp` so the low limb is non-zero,
 *  - collapse to canonical zero when the mantissa is empty.
 *
 * * **destructive**: Returns the same object for convenience.
 */
function dfNormalize(
        x: DyadicFloat): DyadicFloat {

    const m = x.mantissa;

    // 1. Carry-propagate so each limb is a clean integer in range.
    let carry = 0;
    for (let i = 0; i < m.length; i++) {
        const v = m[i] + carry;
        const low = v % LIMB_BASE;
        m[i] = low;
        carry = (v - low) / LIMB_BASE;
    }
    while (carry > 0) {
        const low = carry % LIMB_BASE;
        m.push(low);
        carry = (carry - low) / LIMB_BASE;
    }

    // 2. Trim leading (most-significant) zero limbs.
    while (m.length > 0 && m[m.length - 1] === 0) {
        m.pop();
    }

    // 3. Canonical zero.
    if (m.length === 0) {
        // @ts-ignore
        x.sign = 0;
        // @ts-ignore
        x.exp = 0;
        return x;
    }

    // 4. Factor trailing zero limbs into the exponent.
    let lowZeroLimbs = 0;
    while (lowZeroLimbs < m.length && m[lowZeroLimbs] === 0) {
        lowZeroLimbs++;
    }
    if (lowZeroLimbs > 0) {
        m.splice(0, lowZeroLimbs);
        // @ts-ignore
        x.exp += lowZeroLimbs * LIMB_BITS;
    }

    // 5. TODO: optionally factor trailing zero BITS of m[0] into exp so the
    //    mantissa low bit is odd (a stricter canonical form). Left as a hook.

    return x;
}


export { dfNormalize }
