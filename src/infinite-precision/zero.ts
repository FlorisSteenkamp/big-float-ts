import type { DyadicFloat } from "./dyadic-float.js";


/**
 * The canonical zero: `{ sign: 0, mantissa: [], exp: 0 }`.
 * 
 * * frozen (also its mantissa) since it is shared by all functions returning 
 * zero
 */
const DF_ZERO: DyadicFloat = Object.freeze({ 
    sign: 0, 
    mantissa: Object.freeze([]) as readonly number[], 
    exp: 0 
});


export { DF_ZERO }
