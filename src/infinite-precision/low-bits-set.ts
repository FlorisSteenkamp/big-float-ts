import { LIMB_BITS } from './dyadic-float.js';


/** True iff any of the low `k` bits (positions 0..k-1) of `m` are set. */
function dfLowBitsSet(m: number[], k: number): boolean {
    if (k <= 0) return false;
    const fullLimbs = Math.floor(k / LIMB_BITS);
    for (let i = 0; i < fullLimbs && i < m.length; i++) {
        if (m[i] !== 0) return true;
    }
    const rem = k % LIMB_BITS;
    if (rem > 0 && fullLimbs < m.length) {
        const mask = (1 << rem) - 1;
        if ((m[fullLimbs] & mask) !== 0) return true;
    }
    return false;
}


export { dfLowBitsSet }