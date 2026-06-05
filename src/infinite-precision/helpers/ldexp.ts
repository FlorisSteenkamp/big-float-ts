
/**
 * Compute `x * 2^e` as a double, stepping the exponent so intermediate
 * multipliers stay finite. Handles overflow to ±Infinity and gradual
 * underflow / subnormals correctly.
 */
export function ldexp(x: number, e: number): number {
    if (x === 0) { return 0; }

    while (e > 1023) {
        x *= 2**1023;
        e -= 1023;

        if (!isFinite(x)) { return x; }
    }
    
    while (e < -1074) {
        x *= 2**-1074;
        e += 1074;

        if (x === 0) { return 0; }
    }

    return x * 2**e;
}
