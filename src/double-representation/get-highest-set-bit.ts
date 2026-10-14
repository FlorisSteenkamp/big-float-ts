import { doubleView } from "./double-view.js";


/**
 * Returns the highest set bit of the given double. If no bit is set (input
 * === 0 or +/-inf or NaN) returns NaN.
 */
function getHighestSetBit(a: number): number {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no highest set bit
        return NaN;
    }

    // At this point there must be a highest set bit (always === 52 if the
    // number is not a subnormal.
    doubleView.setFloat64(0, a);
    const hi = doubleView.getUint32(0);
    if ((hi & 0x7ff00000) !== 0) {
        return 52;  // normal number => the hidden bit
    }

    // subnormal
    const sigHi = hi & 0xfffff;
    if (sigHi !== 0) {
        return 32 + 31 - Math.clz32(sigHi);
    }

    return 31 - Math.clz32(doubleView.getUint32(4));
}


export { getHighestSetBit }
