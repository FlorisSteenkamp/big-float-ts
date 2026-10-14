/**
 * Shift a mantissa down by `bits` bits (floor-divide by 2^bits), returning a
 * new limb array. The discarded low bits are lost — used to truncate a
 * mantissa toward zero. The result is not guaranteed normalized.
 */
declare function dfShiftRight(m: readonly number[], bits: number): number[];
export { dfShiftRight };
