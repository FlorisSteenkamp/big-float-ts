"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eLongDivide = void 0;
const e_negative_of_1 = require("./e-negative-of");
const fast_expansion_sum_1 = require("./fast-expansion-sum");
const e_compress_1 = require("./e-compress");
const grow_expansion_1 = require("./grow-expansion");
const e_sum_1 = require("./e-sum");
const scale_expansion_1 = require("./scale-expansion");
const e_diff_1 = require("./e-diff");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const eNegativeOf = e_negative_of_1.eNegativeOf;
const fastExpansionSum = fast_expansion_sum_1.fastExpansionSum;
const eCompress = e_compress_1.eCompress;
const growExpansion = grow_expansion_1.growExpansion;
const eSum = e_sum_1.eSum;
const scaleExpansion = scale_expansion_1.scaleExpansion;
const eDiff = e_diff_1.eDiff;
const sign = Math.sign;
function eLongDivide(N, D) {
    N = eCompress(N);
    D = eCompress(D);
    // get the most significant double
    // out by at most 1 ulp, exact if d < MAX_SAFE_INT
    let d = D[D.length - 1];
    // trivial cases
    if (D.length === 1) {
        if (d === 0) {
            throw new Error('division by zero');
        }
        if (d === 1) {
            return { div: N, rem: [0] };
        }
        if (d === -1) {
            return { div: eNegativeOf(N), rem: [0] };
        }
    }
    const signN = sign(N[N.length - 1]);
    if (signN === 0) {
        return { div: [0], rem: [0] };
    }
    let signD = sign(d);
    let divs = [];
    let oldLen = 0;
    while (true) {
        let rems = [];
        // loop from big `n[i]` to small `n[i]`
        for (let i = N.length - 1; i >= 0; i--) {
            const n = N[i];
            // `n % d` is the exact rem (for rem < MAX_SAFE_INTEGER) but is preliminary 
            // as it is subject to round-off for rem > MAX_SAFE_INTEGER; thus out by at 
            // most 1/2 ulp
            // Due to roundoff (and the fact we'e using `d` and not `D`!), `_div` does 
            // not necessarily represent the exact quotient.
            let div = Math.round((n - (n % d)) / d);
            // get the remainder by calculating `rem = n - d*div`
            rems.push(scaleExpansion(D, div)); // exact
            if (div === 0) {
                break;
            }
            divs.push(div);
        }
        N = eCompress(eDiff(N, eSum(rems)));
        if (oldLen === divs.length) {
            break;
        }
        oldLen = divs.length;
    }
    let rem = N;
    let div = [0];
    for (let i = 0; i < divs.length; i++) {
        div = growExpansion(div, divs[i]);
    }
    div = eCompress(div);
    //----------------------
    // fix signs (possibly)
    //----------------------
    //const signDiv = sign(div[div.length-1]);
    const signRem = sign(rem[rem.length - 1]);
    //const signND = signN * signD;
    // We must have:
    // sign(div) === sign(n) * sign(d)
    // sign(rem) === sign(n)
    // At this point: `signN !== 0` and `signD !== 0`
    if (signRem !== 0 && signRem !== signN) {
        if (signN > 0) {
            if (signD > 0) {
                // div = div - 1  (div is positive)
                // rem = rem + D
                div = growExpansion(div, -1);
                rem = fastExpansionSum(rem, D);
            }
            else {
                // div = div + 1  (div is positive)
                // rem = rem - D
                div = growExpansion(div, +1);
                rem = fastExpansionSum(rem, eNegativeOf(D));
            }
        }
        else if (signN < 0) {
            if (signD > 0) {
                // div = div + 1 (div is negative)
                // rem = rem - D
                div = growExpansion(div, +1);
                rem = fastExpansionSum(rem, eNegativeOf(D));
            }
            else {
                // div = div - 1  (div is positive)
                // rem = rem + D
                div = growExpansion(div, -1);
                rem = fastExpansionSum(rem, D);
            }
        }
    }
    return { div, rem };
}
exports.eLongDivide = eLongDivide;
//# sourceMappingURL=e-long-divide.js.map