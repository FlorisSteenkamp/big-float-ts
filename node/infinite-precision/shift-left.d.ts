/**
 * Shift a mantissa up by `bits` bits (multiply by 2^bits), returning a new
 * limb array. Used to align two operands to a common exponent.
 */
declare function dfShiftLeft(m: readonly number[], bits: number): number[];
export { dfShiftLeft };
