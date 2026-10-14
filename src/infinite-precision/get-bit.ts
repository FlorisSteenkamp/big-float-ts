import { LIMB_BITS } from './dyadic-float.js';


/** Return bit `i` (0 = least significant) of the integer represented by `m`. */
function dfGetBit(m: readonly number[], i: number): number {
    const limb = Math.floor(i / LIMB_BITS);
    if (limb < 0 || limb >= m.length) return 0;
    return (m[limb] >> (i % LIMB_BITS)) & 1;
}

export { dfGetBit }
