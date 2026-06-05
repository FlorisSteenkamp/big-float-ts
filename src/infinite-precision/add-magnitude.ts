import { LIMB_BASE } from './dyadic-float.js';


/**
 * Add two aligned magnitude limb arrays:
 * * returns a + b (not normalized).
 * * * Exact
 */
function dfAddMagnitude(a: number[], b: number[]): number[] {
    const n = Math.max(a.length, b.length);
    const out: number[] = new Array(n);
    let carry = 0;
    for (let i = 0; i < n; i++) {
        const v = (a[i] ?? 0) + (b[i] ?? 0) + carry;
        out[i] = v % LIMB_BASE;
        carry = (v - out[i]) / LIMB_BASE;
    }
    if (carry > 0) out.push(carry);

    return out;
}


export { dfAddMagnitude }
