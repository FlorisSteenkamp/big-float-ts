"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expansionSum = void 0;
const two_sum_1 = require("../basic/two-sum");
const e_compress_1 = require("./e-compress");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const ts = two_sum_1.twoSum;
const compress = e_compress_1.eCompress;
/**
 * Returns the result of adding two expansions.
 * * use `fastExpansionSum` instead, `fastExpansionSum` is nearly always
 * preferred above this function.
 *
 * Theorem 12: Let e = sum_(i=1)^m(e_i) and f = sum_(i=1)^n(f_i) be
 * nonoverlapping expansions of m and n-bit components respectively, where
 * p >= 3. Suppose that the components of both e and f are sorted in order of
 * increasing magnitude, except that any of the e_i or f_i may be zero. Then the
 * following algorithm will produce a nonoverlapping expansion h such that
 * h = sum_(i=1)^(m+n)(h_i) = e + f, where the components of h are in order of
 * increasing magnitude, except that any of the h_i may be zero. Furthermore, if
 * e and f are nonadjacent and round-to-even tiebreaking is used, then h is
 * nonadjacent.
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function expansionSum(e, f) {
    for (let i = 0; i < f.length; i++) {
        // the below is growExpansion unrolled
        let m = e.length;
        let q = f[i];
        //let h: number[] = new Array(m+1);
        const h = [];
        for (let i = 0; i < m; i++) {
            // Note the use of twoSum and not fastTwoSum.
            //[h[i], q] = ts(q, e[i]);
            // inlined (above line)
            const ei = e[i];
            const x = q + ei;
            const bv = x - q;
            //h[i] = (q - (x - bv)) + (ei - bv);
            const hh = (q - (x - bv)) + (ei - bv);
            if (hh !== 0) {
                h.push(hh);
            }
            q = x;
        }
        //h[m] = q;
        h.push(q);
        e = h;
    }
    return compress(e);
    //return e;
}
exports.expansionSum = expansionSum;
//# sourceMappingURL=expansion-sum.js.map