/**
 * Returns the result of converting a floating point expansion to a
 * double-double precision floating point number.
 *
 * * uses truncation to convert thus accurate to within 1 ulp on low double;
 * (a slower summing method could reduce the max error to 1/2 ulp)
 */
declare function eToDd(e: number[]): number[];
export { eToDd };
