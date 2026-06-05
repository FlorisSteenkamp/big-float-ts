import type { DyadicFloat } from '../dyadic-float.js';
/**
 * Reduce a DyadicFloat to canonical form, in place:
 *  - propagate any carries so every limb is in [0, LIMB_BASE),
 *  - drop high-order zero limbs,
 *  - factor out trailing zero limbs into `exp` so the low limb is non-zero,
 *  - collapse to canonical zero when the mantissa is empty.
 *
 * * **destructive**: Returns the same object for convenience.
 */
declare function dfNormalize(x: DyadicFloat): DyadicFloat;
export { dfNormalize };
