import { LIMB_BASE, LIMB_BITS } from './dyadic-float.js';


/**
 * Shift a mantissa down by `bits` bits (floor-divide by 2^bits), returning a
 * new limb array. The discarded low bits are lost — used to truncate a
 * mantissa toward zero. The result is not guaranteed normalized.
 */
function dfShiftRight(m: number[], bits: number): number[] {
    if (bits === 0 || m.length === 0) return m.slice();

    const limbShift = Math.floor(bits / LIMB_BITS);
    if (limbShift >= m.length) return [];

    const bitShift = bits % LIMB_BITS;
    if (bitShift === 0) {
        return m.slice(limbShift);
    }

    const inv = LIMB_BITS - bitShift;
    const lowMask = (1 << bitShift) - 1;
    const out: number[] = new Array(m.length - limbShift);
    for (let i = limbShift; i < m.length; i++) {
        const low = m[i] >> bitShift;
        const high = i + 1 < m.length ? (m[i + 1] & lowMask) * (2 ** inv) : 0;
        out[i - limbShift] = (low + high) % LIMB_BASE;
    }
    return out;
}


export { dfShiftRight }
