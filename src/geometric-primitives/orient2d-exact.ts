
import { twoProduct } from "../basic/two-product.js";
import { eDiff } from "../double-expansion/e-diff.js";
import { twoDiff } from "../basic/two-diff.js";
import { fastExpansionSum } from "../double-expansion/fast-expansion-sum.js";
import { scaleExpansion } from "../double-expansion/scale-expansion.js";
import { eCompress } from "../double-expansion/e-compress.js";


/**
 * * **Dont use!** Use `orien2d` instead.
 * * Only for testing purposes - too slow. 
 * @param a 
 * @param b 
 * @param c 
 */
function orient2dExact(a: number[], b: number[], c: number[]) {
    // det := ax(by - cy) - ay(bx - cx) + (bx*cy - by*cx)

    let term1 = scaleExpansion(
        twoDiff(b[1], c[1]),
        a[0]
    );

    let term2 = scaleExpansion(
        twoDiff(b[0], c[0]),
        -a[1]
    );

    let term3 = eDiff(
        twoProduct(b[0], c[1]),
        twoProduct(b[1], c[0]),
    );

    let term4 = fastExpansionSum(term2, term3);
    
    let det = fastExpansionSum(
        term1, 
        term4
    );

    det = eCompress(det);

    return det[det.length - 1];
}


export { orient2dExact }
