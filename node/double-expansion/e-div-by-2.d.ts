/**
 * Returns the result of dividing a floating point expansion by 2.
 * * **error free** unless underflow occurs (a subnormal component may lose its lowest bit)
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
declare function eDivBy2(e: number[]): number[];
export { eDivBy2 };
