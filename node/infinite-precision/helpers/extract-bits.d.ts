/**
 * Returns bits `lo` up to (but excluding) `lo + count` of the (normalized)
 * integer represented by the limb array `m` as an exact integer, i.e.
 * `floor(M / 2^lo) mod 2^count`.
 *
 * * **precondition:** `lo >= 0` and `count <= 53` (so the result is exact)
 *
 * Works a limb (rather than a bit) at a time.
 */
declare function dfExtractBits(m: readonly number[], lo: number, count: number): number;
export { dfExtractBits };
