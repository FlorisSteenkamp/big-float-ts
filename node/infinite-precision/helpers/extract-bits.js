import { LIMB_BITS } from '../dyadic-float.js';
/**
 * Returns bits `lo` up to (but excluding) `lo + count` of the (normalized)
 * integer represented by the limb array `m` as an exact integer, i.e.
 * `floor(M / 2^lo) mod 2^count`.
 *
 * * **precondition:** `lo >= 0` and `count <= 53` (so the result is exact)
 *
 * Works a limb (rather than a bit) at a time.
 */
function dfExtractBits(m, lo, count) {
    let result = 0;
    let got = 0; // number of bits extracted so far
    let i = Math.floor(lo / LIMB_BITS);
    let offset = lo % LIMB_BITS;
    while (got < count && i < m.length) {
        const take = Math.min(LIMB_BITS - offset, count - got);
        const bits = (m[i] >>> offset) & ((1 << take) - 1);
        result += bits * 2 ** got;
        got += take;
        offset = 0;
        i++;
    }
    return result;
}
export { dfExtractBits };
//# sourceMappingURL=extract-bits.js.map