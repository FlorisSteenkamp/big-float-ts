/**
 * Subtract aligned magnitudes: returns a - b, ASSUMING a >= b.
 * Result is not normalized (may carry leading zeros).
 */
declare function dfSubMagnitude(a: readonly number[], b: readonly number[]): number[];
export { dfSubMagnitude };
