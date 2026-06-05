/**
 * Compute `x * 2^e` as a double, stepping the exponent so intermediate
 * multipliers stay finite. Handles overflow to ±Infinity and gradual
 * underflow / subnormals correctly.
 */
export declare function ldexp(x: number, e: number): number;
