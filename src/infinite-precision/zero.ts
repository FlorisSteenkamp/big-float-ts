import type { DyadicFloat } from "./dyadic-float.js";


/**
 * The canonical zero: `{ sign: 0, mantissa: [], exp: 0 }`.
 */
const DF_ZERO: DyadicFloat = { sign: 0, mantissa: [], exp: 0 };


export { DF_ZERO }
