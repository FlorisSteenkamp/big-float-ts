import { SPLIT_FACTOR as f } from '../basic/split-factor.js';
/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 19 (Shewchuk): Let e = sum_(i=1)^m(e_i) be a nonoverlapping expansion
 * of m p-bit components, and const b be a p-bit value where p >= 4. Suppose that
 * the components of e are sorted in order of increasing magnitude, except that
 * any of the e_i may be zero. Then the following algorithm will produce a
 * nonoverlapping expansion h such that h = sum_(i=1)^(2m)(h_i) = be, where the
 * components of h are also in order of increasing magnitude, except that any of
 * the h_i may be zero. Furthermore, if e is nonadjacent and round-to-even
 * tiebreaking is used, then h is non-adjacent.
 *
 * * the primitives (`twoProduct`, `twoSum`, `fastTwoSum`) are inlined for
 * performance - calling them is 2-7x slower due to the arrays they return
 * * zero components are eliminated from the result
 * * subject to the same overflow / underflow limits as `twoProduct` (e.g.
 * NaN results for components or `b` with magnitude > ~2^996)
 *
 * @param e a double floating point expansion
 * @param b a double
 */
function scaleExpansion(e, b) {
    const m = e.length;
    // an empty expansion represents 0
    if (m === 0) {
        return [0];
    }
    // split `b` once (`[bh, bl] = split(b)`)
    const d = f * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const h = [];
    // inlined: [hh, q] = twoProduct(e[0], b)
    const a = e[0];
    let q = a * b;
    const c = f * a;
    const ah = c - (c - a);
    const al = a - ah;
    const hh = (al * bl) - ((q - (ah * bh)) - (al * bh) - (ah * bl));
    if (hh !== 0) {
        h.push(hh);
    }
    for (let i = 1; i < m; i++) {
        // inlined: [t, T] = twoProduct(e[i], b)
        const a = e[i];
        const T = a * b;
        const c = f * a;
        const ah = c - (c - a);
        const al = a - ah;
        const t = (al * bl) - ((T - (ah * bh)) - (al * bh) - (ah * bl));
        // inlined: [hh, q_] = twoSum(q, t)
        const q_ = q + t;
        const bv = q_ - q;
        const hh = (q - (q_ - bv)) + (t - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        // inlined: [hhh, q] = fastTwoSum(T, q_)
        const xx = T + q_;
        const hhh = q_ - (xx - T);
        if (hhh !== 0) {
            h.push(hhh);
        }
        q = xx;
    }
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    return h;
}
/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * identical to `scaleExpansion` but with the parameters swapped
 *
 * @param b a double
 * @param e a double floating point expansion
 */
function scaleExpansion2(b, e) {
    return scaleExpansion(e, b);
}
export { scaleExpansion, scaleExpansion2 };
//# sourceMappingURL=scale-expansion.js.map