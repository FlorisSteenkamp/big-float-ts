import { LIMB_BASE, LIMB_BITS } from '../dyadic-float.js';
/**
 * Reduce a DyadicFloat to canonical form, in place:
 *  - propagate any carries so every limb is in [0, LIMB_BASE),
 *  - drop high-order zero limbs,
 *  - factor out trailing zero limbs and bits into `exp` so the mantissa is
 *    odd,
 *  - collapse to canonical zero when the mantissa is empty.
 *
 * The result is unique per value, so (normalized) values can be compared
 * structurally (see `dfEquals`).
 *
 * * **destructive**: Returns the same object for convenience (thus only call
 * it on a freshly created value, never on e.g. `DF_ZERO`).
 */
function dfNormalize(x) {
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
        x.sign = 0;
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
        x.exp += lowZeroLimbs * LIMB_BITS;
    }
    // 5. Factor trailing zero bits of m[0] into the exponent so the mantissa
    //    is odd. This makes the representation unique: two normalized values
    //    are equal iff their sign, exp and limbs are equal.
    const tz = 31 - Math.clz32(m[0] & -m[0]); // m[0] !== 0 here
    if (tz > 0) {
        const mask = (1 << tz) - 1;
        const up = LIMB_BITS - tz;
        const last = m.length - 1;
        for (let i = 0; i < last; i++) {
            // all limbs are < 2^26 so these 32-bit operations are exact
            m[i] = (m[i] >>> tz) | ((m[i + 1] & mask) << up);
        }
        m[last] >>>= tz;
        if (m[last] === 0) {
            m.pop();
        } // at most one limb can empty out
        x.exp += tz;
    }
    return x;
}
export { dfNormalize };
//# sourceMappingURL=normalize.js.map