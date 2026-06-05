import { LIMB_BITS } from './dyadic-float.js';
import { dfLimbBitLength } from './limb-bit-length.js';


/**
 * Number of significant bits of the integer represented by `m`
 * (position of the most-significant set bit, plus one). Zero for an empty
 * mantissa. Assumes `m` is normalized (top limb non-zero).
 */
function dfMantissaBitLength(m: number[]): number {
    if (m.length === 0) return 0;
    return (m.length - 1) * LIMB_BITS + dfLimbBitLength(m[m.length - 1]);
}


export { dfMantissaBitLength }
