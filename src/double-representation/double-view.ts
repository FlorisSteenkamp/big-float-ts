
/**
 * A shared scratch `DataView` over 8 bytes used to inspect the IEEE-754 bits
 * of a double without allocating on every call.
 *
 * * **not re-entrant**: callers must read what they need immediately after
 * writing (which is always the case in this single-threaded library).
 */
const doubleView = new DataView(new ArrayBuffer(8));


/**
 * Returns the high 32-bit word (sign, 11 exponent bits and the top 20 fraction
 * bits) of the given double.
 */
function getHiWord(a: number): number {
    doubleView.setFloat64(0, a);
    return doubleView.getUint32(0);
}


export { doubleView, getHiWord }
