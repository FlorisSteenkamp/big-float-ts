import { LIMB_BASE } from './dyadic-float.js';


/**
 * Add two aligned magnitude limb arrays:
 * * returns a + b (not normalized).
 * * * Exact
 */
function dfAddMagnitude(a: readonly number[], b: readonly number[]): number[] {
    const n = Math.max(a.length, b.length);
    const out: number[] = [];
    let carry = 0;
    for (let i = 0; i < n; i++) {
        const v = (a[i] ?? 0) + (b[i] ?? 0) + carry;
        const low = v % LIMB_BASE;
        out.push(low);
        carry = (v - low) / LIMB_BASE;
    }
    if (carry > 0) out.push(carry);

    return out;
}


export { dfAddMagnitude }
