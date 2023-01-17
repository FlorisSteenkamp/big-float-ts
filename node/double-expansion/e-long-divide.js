import { eNegativeOf as eNegativeOf_ } from './e-negative-of.js';
import { fastExpansionSum as fastExpansionSum_ } from './fast-expansion-sum.js';
import { eCompress as eCompress_ } from './e-compress.js';
import { growExpansion as growExpansion_ } from './grow-expansion.js';
import { eSum as eSum_ } from './e-sum.js';
import { scaleExpansion as scaleExpansion_ } from './scale-expansion.js';
import { eDiff as eDiff_ } from './e-diff.js';
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const eNegativeOf = eNegativeOf_;
const fastExpansionSum = fastExpansionSum_;
const eCompress = eCompress_;
const growExpansion = growExpansion_;
const eSum = eSum_;
const scaleExpansion = scaleExpansion_;
const eDiff = eDiff_;
const sign = Math.sign;
function eLongDivide(N, D) {
    N = eCompress(N);
    D = eCompress(D);
    // get the most significant double
    // out by at most 1 ulp, exact if d < MAX_SAFE_INT
    const d = D[D.length - 1];
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
    const signD = sign(d);
    const divs = [];
    let oldLen = 0;
    while (true) {
        const rems = [];
        // loop from big `n[i]` to small `n[i]`
        for (let i = N.length - 1; i >= 0; i--) {
            const n = N[i];
            // `n % d` is the exact rem (for rem < MAX_SAFE_INTEGER) but is preliminary 
            // as it is subject to round-off for rem > MAX_SAFE_INTEGER; thus out by at 
            // most 1/2 ulp
            // Due to roundoff (and the fact we'e using `d` and not `D`!), `_div` does 
            // not necessarily represent the exact quotient.
            const div = Math.round((n - (n % d)) / d);
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
export { eLongDivide };
//# sourceMappingURL=e-long-divide.js.map