import type { DyadicFloat } from './dyadic-float.js';
import { dfShiftLeft } from './shift-left.js';


/**
 * Align two values to a common (lower) exponent so their mantissas can be
 * added/subtracted limb-by-limb. Returns the two shifted mantissas and the
 * shared exponent. Does not mutate inputs.
 */
function dfAlign(a: DyadicFloat, b: DyadicFloat): { ma: number[]; mb: number[]; exp: number } {
    const exp = Math.min(a.exp, b.exp);
    const ma = dfShiftLeft(a.mantissa, a.exp - exp);
    const mb = dfShiftLeft(b.mantissa, b.exp - exp);
    return { ma, mb, exp };
}


export { dfAlign }
