import type { DyadicFloat } from './dyadic-float.js';
/**
 * Align two values to a common (lower) exponent so their mantissas can be
 * added/subtracted limb-by-limb. Returns the two shifted mantissas and the
 * shared exponent. Does not mutate inputs.
 */
declare function dfAlign(a: DyadicFloat, b: DyadicFloat): {
    ma: number[];
    mb: number[];
    exp: number;
};
export { dfAlign };
