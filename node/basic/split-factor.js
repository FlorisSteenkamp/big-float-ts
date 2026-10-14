/**
 * The Veltkamp splitting factor for doubles, `2**27 + 1`, i.e.
 * `2**s + 1` with `s === Math.ceil(p/2)` where p (=== 53) is the number of
 * significand bits in a double.
 *
 * * used by `split` and (inlined) by `twoProduct`, `twoSquare` and
 * `scaleExpansion`
 */
const SPLIT_FACTOR = 134217729; // 2**27 + 1
export { SPLIT_FACTOR };
//# sourceMappingURL=split-factor.js.map