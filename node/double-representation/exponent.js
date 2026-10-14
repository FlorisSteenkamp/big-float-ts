import { getHiWord } from './double-view.js';
/**
 * Returns the normalized exponent of the given number.
 * @param a A double
 */
function exponent(a) {
    const expField = (getHiWord(a) >>> 20) & 0x7ff;
    // Subnormals (and 0) use a biased exponent of 1 (not 0!)
    return expField === 0 ? -1022 : expField - 1023;
}
export { exponent };
//# sourceMappingURL=exponent.js.map