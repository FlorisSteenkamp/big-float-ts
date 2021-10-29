

// Work in progress...

/*
import { twoSquare } from "../basic/two-square.js";
import { twoProduct } from "../basic/two-product.js";
import { ddMultDouble2 } from "../double-double-precision/dd-mult-double.js";
import { ddDiffDd } from "../double-double-precision/dd-diff-dd.js";
import { eDivBy2 } from "./e-div-by-2.js";
import { ddDivDd } from "../double-double-precision/dd-div-dd.js";
import { expansionProduct } from "./expansion-product.js";
import { growExpansion } from "./grow-expansion.js";
import { eNegativeOf } from "./e-negative-of.js";

const sqrt = Math.sqrt;


/**
 * Returns the square root of a double as a double-double.
 * 
 * Based on Algorithm 11: Truncated “division-free” Newton iteration (31) based 
 * algorithm for reciprocal of the square root of an FP expansion. By 
 * “division-free” we mean that we do not need a division of FP expansions.
 * * only compact expansions are allowed as input - so call compress before 
 * calling this function AND make sure expansion length is correct.
 * * error bound: ??? TODO - it is in the paper
 * @param a a floating point expansion - important: see function description
 *//*
// TODO - finish implementation of this function (add error bounds) It works 
// otherwise
function sqrt_Dd(a: number): number[] {
    let x0 = 1/sqrt(a);

    // --------
    // i === 0
    // --------

    // let v[0:2**(i+1)-1] = expansionProduct(x[0:2**i−1], a[0:2**(i+1)−1], 2**(i+1));
    // i === 0 => let v[0:1] = expansionProduct(x[0:0], a[0:1], 2);
    let v = twoProduct(x0, a);

    // let w[0:2**(i+1)-1] = expansionProduct(x[0:2**i−1], v[0:2**(i+1)−1], 2**(i+1));
    // i === 0 => let w[0:1] = expansionProduct(x[0:0], v[0:1], 2);
    let w = ddMultDouble2(x0, v);

    // let y[0:2**(i+1)-1] = expansionDiff(3, w[0:2**(i+1) − 1], 2**(i+1));
    // i === 0 => let y[0:1] = expansionDiff(3, w[0:2**(i+1) − 1], 2);
    let y = ddDiffDd([0,3],w);

    // let z[0:2**(i+1)-1] = expansionProduct(x[0:2**i−1], y[0:2**(i+1)−1], 2**(i+1));
    // i === 0 => let z[0:1] = expansionProduct(x[0:0], y[0:1], 2);
    let z = ddMultDouble2(x0, y);

    // let x[0:2**(i+1)-1] = z[0:2**(i+1)−1] * 0.5;
    // i === 0 => let x[0:1] = z[0:1] / 2;
    let x = eDivBy2(z);

    // --------
    // i === 1
    // --------
    // ... -> left for higher order versions

    return ddDivDd([0,1],x);
    //return x = x0 + . . . + x2_(q−1).
}



// TODO - Implement higher order square roots, e.g. quad to quad, etc.
function dSqrt2(a: number[]): number[] {
    // length of output ==== 2**q (e.g. q === 1 for quad precision)

    let x = [1/sqrt(a[0])];
    for (let i=0; i<1; i++) {
        //let v[0:2**(i+1)-1] = expansionProduct(x[0:2**i−1], a[0:2**(i+1)−1], 2**(i+1));
        let v = expansionProduct(x, a);
        //let w[0:2**(i+1)-1] = expansionProduct(x[0:2**i−1], v[0:2**(i+1)−1], 2**(i+1));
        let w = expansionProduct(x, v);
        //let y[0:2**(i+1)-1] = expansionDiff(3, w[0:2**(i+1) − 1], 2**(i+1));
        let y = growExpansion(eNegativeOf(w), 3);
        //let z[0:2**(i+1)-1] = expansionProduct(x[0:2**i−1], y[0:2**(i+1)−1], 2**(i+1));
        let z = expansionProduct(x, y);
        //let x[0:2**(i+1)-1] = z[0:2**(i+1)−1] * 0.5;
        x = eDivBy2(z);
    }

    return x;
    //return x = x0 + . . . + x2_(q−1).
}


//export { dSqrt2 }
*/