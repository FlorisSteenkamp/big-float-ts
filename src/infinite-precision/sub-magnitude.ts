import { LIMB_BASE } from './dyadic-float.js';


/**
 * Subtract aligned magnitudes: returns a - b, ASSUMING a >= b.
 * Result is not normalized (may carry leading zeros).
 */
function dfSubMagnitude(a: readonly number[], b: readonly number[]): number[] {
    const out: number[] = new Array(a.length);
    let borrow = 0;
    for (let i = 0; i < a.length; i++) {
        let v = a[i] - (b[i] ?? 0) - borrow;
        if (v < 0) {
            v += LIMB_BASE;
            borrow = 1;
        } else {
            borrow = 0;
        }
        out[i] = v;
    }
    // borrow should be 0 here when a >= b.
    return out;
}


export { dfSubMagnitude }
