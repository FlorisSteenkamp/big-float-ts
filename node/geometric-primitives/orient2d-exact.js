"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orient2dExact = void 0;
const two_product_1 = require("../basic/two-product");
const e_diff_1 = require("../double-expansion/e-diff");
const two_diff_1 = require("../basic/two-diff");
const fast_expansion_sum_1 = require("../double-expansion/fast-expansion-sum");
const scale_expansion_1 = require("../double-expansion/scale-expansion");
const e_compress_1 = require("../double-expansion/e-compress");
/**
 * * **Dont use!** Use `orien2d` instead.
 * * Only for testing purposes - too slow.
 * @param a
 * @param b
 * @param c
 */
function orient2dExact(a, b, c) {
    // det := ax(by - cy) - ay(bx - cx) + (bx*cy - by*cx)
    let term1 = scale_expansion_1.scaleExpansion(two_diff_1.twoDiff(b[1], c[1]), a[0]);
    let term2 = scale_expansion_1.scaleExpansion(two_diff_1.twoDiff(b[0], c[0]), -a[1]);
    let term3 = e_diff_1.eDiff(two_product_1.twoProduct(b[0], c[1]), two_product_1.twoProduct(b[1], c[0]));
    let term4 = fast_expansion_sum_1.fastExpansionSum(term2, term3);
    let det = fast_expansion_sum_1.fastExpansionSum(term1, term4);
    det = e_compress_1.eCompress(det);
    return det[det.length - 1];
}
exports.orient2dExact = orient2dExact;
//# sourceMappingURL=orient2d-exact.js.map