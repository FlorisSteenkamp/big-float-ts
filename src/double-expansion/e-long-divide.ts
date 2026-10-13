import { eNegativeOf } from './e-negative-of.js'
import { fastExpansionSum } from './fast-expansion-sum.js'
import { eCompress } from './e-compress.js';
import { growExpansion } from './grow-expansion.js'; 
import { eSum } from './e-sum.js';
import { scaleExpansion } from './scale-expansion.js';
import { eDiff } from './e-diff.js';
import { eAbs } from './e-abs.js';
import { eCompare } from './e-compare.js';


const sign = Math.sign;


function eLongDivide(
        N: number[], D: number[]): { div: number[], rem: number[] } {

    // non-finite input would otherwise cause an infinite loop below
    if (!N.every(Number.isFinite) || !D.every(Number.isFinite)) {
        throw new Error('eLongDivide: N and D must be finite');
    }

    N = eCompress(N);
    D = eCompress(D);
    
    // get the most significant double
    // out by at most 1 ulp, exact if d < MAX_SAFE_INT
    const d = D[D.length-1];

    // trivial cases
    if (D.length === 1) { 
        if (d === 0) { throw new Error('division by zero');  }
        if (d === 1) { return { div: N, rem: [0] }; }
        if (d === -1) { return { div: eNegativeOf(N), rem: [0] } ; }
    }

    const signN = sign(N[N.length-1]);
    if (signN === 0) { return { div: [0], rem: [0] }}
    const signD = sign(d);

    const divs = [];
    let oldLen = 0;
    while (true) {
        const rems = [];

        // loop from big `n[i]` to small `n[i]`
        for (let i=N.length-1; i>=0; i--) {
            const n = N[i];

            // `n % d` is the exact rem (for rem < MAX_SAFE_INTEGER) but is preliminary 
            // as it is subject to round-off for rem > MAX_SAFE_INTEGER; thus out by at 
            // most 1/2 ulp

            // Due to roundoff (and the fact we'e using `d` and not `D`!), `_div` does 
            // not necessarily represent the exact quotient.
            const div = Math.round((n - (n % d)) / d);

            if (div === 0) { break; }

            // get the remainder by calculating `rem = n - d*div`
            rems.push(scaleExpansion(D, div));  // exact
            divs.push(div);
        }

        N = eCompress(eDiff(N,eSum(rems)));

        if (oldLen === divs.length) { break; }
        oldLen = divs.length;
    }


    let rem = N;

    let div = [0];
    for (let i=0; i<divs.length; i++) {
        div = growExpansion(div, divs[i]);
    }

    //----------------------------------------------------------------------
    // fix-up (possibly)
    //----------------------------------------------------------------------
    // We must have (with `N === div*D + rem` maintained throughout):
    // * sign(div) === sign(N) * sign(D)
    // * sign(rem) === sign(N) (or rem === 0)
    // * |rem| < |D|
    //
    // At this point: `signN !== 0` and `signD !== 0`.
    const sameSign = signN === signD;
    const negD = eNegativeOf(D);
    const absD = eAbs(D);

    // rem has the wrong sign => move it one |D| towards the sign of N
    while (sign(rem[rem.length-1]) === -signN) {
        div = growExpansion(div, sameSign ? -1 : +1);
        rem = eCompress(fastExpansionSum(rem, sameSign ? D : negD));
    }

    // |rem| too large => move it one |D| towards zero
    while (eCompare(eAbs(rem), absD) >= 0) {
        div = growExpansion(div, sameSign ? +1 : -1);
        rem = eCompress(fastExpansionSum(rem, sameSign ? negD : D));
    }

    div = eCompress(div);

    return { div, rem };
}


export { eLongDivide }
