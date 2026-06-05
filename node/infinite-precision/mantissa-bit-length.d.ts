/**
 * Number of significant bits of the integer represented by `m`
 * (position of the most-significant set bit, plus one). Zero for an empty
 * mantissa. Assumes `m` is normalized (top limb non-zero).
 */
declare function dfMantissaBitLength(m: number[]): number;
export { dfMantissaBitLength };
