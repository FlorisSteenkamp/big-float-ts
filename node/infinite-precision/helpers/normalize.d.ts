import type { DyadicFloat, MutableDyadicFloat } from '../dyadic-float.js';
/**
 * Reduce a DyadicFloat to canonical form, in place:
 *  - propagate any carries so every limb is in [0, LIMB_BASE),
 *  - drop high-order zero limbs,
 *  - factor out trailing zero limbs and bits into `exp` so the mantissa is
 *    odd,
 *  - collapse to canonical zero when the mantissa is empty.
 *
 * The result is unique per value, so (normalized) values can be compared
 * structurally (see `dfEquals`).
 *
 * * **destructive**: Returns the same object for convenience (thus only call
 * it on a freshly created value, never on e.g. `DF_ZERO`).
 */
declare function dfNormalize(x: MutableDyadicFloat): DyadicFloat;
export { dfNormalize };
