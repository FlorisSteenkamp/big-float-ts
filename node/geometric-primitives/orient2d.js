import { twoProduct } from "../basic/two-product.js";
import { eDiff } from "../double-expansion/e-diff.js";
import { eEstimate } from "../double-expansion/e-estimate.js";
import { twoDiff } from "../basic/two-diff.js";
import { fastExpansionSum } from "../double-expansion/fast-expansion-sum.js";
import { eCompress } from "../double-expansion/e-compress.js";
const ccwerrboundA = 3.330669073875472e-16;
const ccwerrboundB = 2.220446049250315e-16;
const ccwerrboundC = 1.109335647967049e-31;
const resulterrbound = 3.330669073875471e-16;
/**
 * * Ported from [Shewchuk](http://docs.ros.org/kinetic/api/asr_approx_mvbb/html/Predicates_8cpp_source.html)
 * * see also https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 *
 * * Adaptive exact 2d orientation test.
 *
 * * Robust.
 *
 * Return a positive value if the points pa, pb, and pc occur in
 * counterclockwise order; a negative value if they occur in clockwise order;
 * and zero if they are collinear.  The result is also a rough approximation of
 * twice the signed area of the triangle defined by the three points.
 *
 * The result returned is the determinant of a matrix. This determinant is
 * computed adaptively, in the sense that exact arithmetic is used only to the
 * degree it is needed to ensure that the returned value has the correct sign.
 * Hence, orient2d() is usually quite fast, but will run more slowly when the
 * input points are collinear or nearly so.
 */
function orient2d(A, B, C) {
    const detleft = (A[0] - C[0]) * (B[1] - C[1]);
    const detright = (A[1] - C[1]) * (B[0] - C[0]);
    const det = detleft - detright;
    let detsum;
    if (detleft > 0) {
        if (detright <= 0) {
            // Anti-clockwise
            return det;
        }
        else {
            detsum = detleft + detright;
        }
    }
    else if (detleft < 0) {
        if (detright >= 0) {
            // Clockwise
            return det;
        }
        else {
            detsum = -detleft - detright;
        }
    }
    else {
        // Anti-clockwise, clockwise or straight
        return det;
    }
    if (Math.abs(det) >= ccwerrboundA * detsum) {
        // Anti-clockwise or clockwise
        return det;
    }
    return orient2dAdapt(A, B, C, detsum);
}
function orient2dAdapt(A, B, C, detsum) {
    const acx = A[0] - C[0];
    const bcx = B[0] - C[0];
    const acy = A[1] - C[1];
    const bcy = B[1] - C[1];
    const b = eDiff(twoProduct(acx, bcy), twoProduct(acy, bcx));
    let det = eEstimate(b);
    if (Math.abs(det) >= ccwerrboundB * detsum) {
        // Anti-clockwise or clockwise
        return det;
    }
    const acxtail = twoDiff(A[0], C[0])[0];
    const bcxtail = twoDiff(B[0], C[0])[0];
    const acytail = twoDiff(A[1], C[1])[0];
    const bcytail = twoDiff(B[1], C[1])[0];
    if (acxtail === 0 && acytail === 0 &&
        bcxtail === 0 && bcytail === 0) {
        // Straight
        return det;
    }
    const errbound = ccwerrboundC * detsum + resulterrbound * Math.abs(det);
    det += (acx * bcytail + bcy * acxtail) - (acy * bcxtail + bcx * acytail);
    if (Math.abs(det) >= errbound) {
        return det;
    }
    const a = eDiff(twoProduct(acxtail, bcy), twoProduct(acytail, bcx));
    const c = fastExpansionSum(b, a);
    const d = eDiff(twoProduct(acx, bcytail), twoProduct(acy, bcxtail));
    const e = fastExpansionSum(c, d);
    const f = eDiff(twoProduct(acxtail, bcytail), twoProduct(acytail, bcxtail));
    let D = fastExpansionSum(e, f);
    D = eCompress(D);
    return D[D.length - 1];
}
export { orient2d };
//# sourceMappingURL=orient2d.js.map