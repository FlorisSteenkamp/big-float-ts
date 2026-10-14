import type { DyadicFloat } from "./dyadic-float.js";
/**
 * The canonical zero: `{ sign: 0, mantissa: [], exp: 0 }`.
 *
 * * frozen (also its mantissa) since it is shared by all functions returning
 * zero
 */
declare const DF_ZERO: DyadicFloat;
export { DF_ZERO };
