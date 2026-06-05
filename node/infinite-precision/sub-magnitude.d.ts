/**
 * Subtract aligned magnitudes: returns a - b, ASSUMING a >= b.
 * Result is not normalized (may carry leading zeros).
 */
declare function dfSubMagnitude(a: number[], b: number[]): number[];
export { dfSubMagnitude };
