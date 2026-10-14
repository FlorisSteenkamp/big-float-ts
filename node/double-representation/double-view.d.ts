/**
 * A shared scratch `DataView` over 8 bytes used to inspect the IEEE-754 bits
 * of a double without allocating on every call.
 *
 * * **not re-entrant**: callers must read what they need immediately after
 * writing (which is always the case in this single-threaded library).
 */
declare const doubleView: DataView<ArrayBuffer>;
/**
 * Returns the high 32-bit word (sign, 11 exponent bits and the top 20 fraction
 * bits) of the given double.
 */
declare function getHiWord(a: number): number;
export { doubleView, getHiWord };
