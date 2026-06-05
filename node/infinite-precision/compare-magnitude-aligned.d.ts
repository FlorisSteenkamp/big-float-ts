/**
 * Compare two aligned magnitude limb arrays (same exponent assumed).
 * Returns -1, 0 or 1 for a<b, a==b, a>b respectively.
 */
declare function dfCompareMagnitudeAligned(a: number[], b: number[]): number;
export { dfCompareMagnitudeAligned };
