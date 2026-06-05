import { LIMB_BASE, LIMB_BITS } from './dyadic-float.js';
/**
 * Shift a mantissa up by `bits` bits (multiply by 2^bits), returning a new
 * limb array. Used to align two operands to a common exponent.
 */
function dfShiftLeft(m, bits) {
    if (bits === 0 || m.length === 0)
        return m.slice();
    const limbShift = Math.floor(bits / LIMB_BITS);
    const bitShift = bits % LIMB_BITS;
    const out = new Array(limbShift).fill(0);
    if (bitShift === 0) {
        for (let i = 0; i < m.length; i++)
            out.push(m[i]);
        return out;
    }
    let carry = 0;
    for (let i = 0; i < m.length; i++) {
        const v = m[i] * (2 ** bitShift) + carry;
        out.push(v % LIMB_BASE);
        carry = Math.floor(v / LIMB_BASE);
    }
    while (carry > 0) {
        out.push(carry % LIMB_BASE);
        carry = Math.floor(carry / LIMB_BASE);
    }
    return out;
}
export { dfShiftLeft };
//# sourceMappingURL=shift-left.js.map