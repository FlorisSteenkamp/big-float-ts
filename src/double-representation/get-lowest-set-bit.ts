import { doubleView } from "./double-view.js";


/**
 * Returns the lowest set bit of the given number's significand (where the lsb
 * is bit 0 and the msb is bit 52). If no bit is set (input === 0 or +-inf or
 * NaN) returns NaN.
 */
function getLowestSetBit(a: number) {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no lowest set bit
        return NaN;
    }

    doubleView.setFloat64(0, a);
    const lo = doubleView.getUint32(4);
    if (lo !== 0) {
        return 31 - Math.clz32(lo & -lo);
    }

    // Note: the significand includes the hidden bit!
    const hi = doubleView.getUint32(0);
    const sigHi = (hi & 0xfffff) | ((hi & 0x7ff00000) === 0 ? 0 : 0x100000);

    return 32 + 31 - Math.clz32(sigHi & -sigHi);
}


export { getLowestSetBit }
