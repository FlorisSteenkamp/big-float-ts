import { merge } from "./merge.js";


/**
 * Returns the result of adding two expansions.
 *
 * Theorem 13: Let e = sum_(i=1)^m(e_i) and f = sum_(i=1)^n(f_i) be strongly
 * nonoverlapping expansions of m and n p-bit components, respectively, where
 * p >= 4. Suppose that the components of both e and f are sorted in order of
 * increasing magnitude, except that any of the e_i or f_i may be zero. On a
 * machine whose arithmetic uses the round-to-even rule, the following algorithm
 * will produce a strongly nonoverlapping expansion h such that
 * sum_(i=1)^(m+n)(e_i + f_i) = e + f, where the components of h are also in
 * order of increasing magnitude, except that any of the h_i may be zero.
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 *
 * * `fastTwoSum` and `twoSum` are inlined for performance - calling them is
 * about 2x slower due to the arrays they return
 * * zero components are eliminated from the result
 */
function fastExpansionSum(e: number[], f: number[]) {
    const g = merge(e,f);

    const len = g.length;
    if (len === 1) { return g; }

    const h: number[] = [];

    // inlined: [hh, q] = fastTwoSum(g[1], g[0])
    const a = g[1];
    const b = g[0];
    let q = a + b;
    const hh = b - (q - a);
    if (hh !== 0) { h.push(hh); }

    for (let i=2; i<len; i++) {
        // inlined: [hh, q] = twoSum(q, g[i])
        const b = g[i];
        const R = q + b; const _ = R - q;
        const hh = (q - (R - _)) + (b - _);
        if (hh !== 0) { h.push(hh); }
        q = R;
    }

    if (q !== 0 || h.length === 0) { h.push(q); }

    return h;
}


export { fastExpansionSum }
