"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orient2d = void 0;
const two_product_1 = require("../basic/two-product");
const e_diff_1 = require("../double-expansion/e-diff");
const e_estimate_1 = require("../double-expansion/e-estimate");
const two_diff_1 = require("../basic/two-diff");
const fast_expansion_sum_1 = require("../double-expansion/fast-expansion-sum");
const e_compress_1 = require("../double-expansion/e-compress");
let ccwerrboundA = 3.330669073875472e-16;
let ccwerrboundB = 2.220446049250315e-16;
let ccwerrboundC = 1.109335647967049e-31;
let resulterrbound = 3.330669073875471e-16;
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
    let detleft = (A[0] - C[0]) * (B[1] - C[1]);
    let detright = (A[1] - C[1]) * (B[0] - C[0]);
    let det = detleft - detright;
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
exports.orient2d = orient2d;
function orient2dAdapt(A, B, C, detsum) {
    let acx = A[0] - C[0];
    let bcx = B[0] - C[0];
    let acy = A[1] - C[1];
    let bcy = B[1] - C[1];
    let b = e_diff_1.eDiff(two_product_1.twoProduct(acx, bcy), two_product_1.twoProduct(acy, bcx));
    let det = e_estimate_1.eEstimate(b);
    if (Math.abs(det) >= ccwerrboundB * detsum) {
        // Anti-clockwise or clockwise
        return det;
    }
    let acxtail = two_diff_1.twoDiff(A[0], C[0])[0];
    let bcxtail = two_diff_1.twoDiff(B[0], C[0])[0];
    let acytail = two_diff_1.twoDiff(A[1], C[1])[0];
    let bcytail = two_diff_1.twoDiff(B[1], C[1])[0];
    if (acxtail === 0 && acytail === 0 &&
        bcxtail === 0 && bcytail === 0) {
        // Straight
        return det;
    }
    let errbound = ccwerrboundC * detsum + resulterrbound * Math.abs(det);
    det += (acx * bcytail + bcy * acxtail) - (acy * bcxtail + bcx * acytail);
    if (Math.abs(det) >= errbound) {
        return det;
    }
    let a = e_diff_1.eDiff(two_product_1.twoProduct(acxtail, bcy), two_product_1.twoProduct(acytail, bcx));
    let c = fast_expansion_sum_1.fastExpansionSum(b, a);
    let d = e_diff_1.eDiff(two_product_1.twoProduct(acx, bcytail), two_product_1.twoProduct(acy, bcxtail));
    let e = fast_expansion_sum_1.fastExpansionSum(c, d);
    let f = e_diff_1.eDiff(two_product_1.twoProduct(acxtail, bcytail), two_product_1.twoProduct(acytail, bcxtail));
    let D = fast_expansion_sum_1.fastExpansionSum(e, f);
    D = e_compress_1.eCompress(D);
    return D[D.length - 1];
}
//# sourceMappingURL=orient2d.js.map