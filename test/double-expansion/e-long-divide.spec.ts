import { assert } from 'chai';
import { 
    expansionProduct, eAbs, eCompress, eSum, eDiff, 
    isNonOverlappingAll, isAdjacent, eCompare, eIsInteger,
    eNegativeOf, eLongDivide, exponent, bitLength
} from '../../node/index.js';


const sign = Math.sign;


const MSI = Number.MAX_SAFE_INTEGER;  // 9007199254740991
const MSI_min63 = Number.MAX_SAFE_INTEGER - 63;  // 9007199254740928
const MSI_2_53 = MSI*2**53;  // 81129638414606672688589750403072
const MSI_plus1 = MSI + 1;  // 9007199254740992
const MSI_min1 = MSI - 1;  // 9007199254740990

const e1 = [MSI];       // [9007199254740991]
const e2 = [2*MSI];     // [18014398509481982]
const e3 = [-1,2*MSI];  // [-1,18014398509481982]
const e4 = [+1,2*MSI];  // [+1,18014398509481982]
const e5 = eSum([[63],[MSI_min63],[MSI_2_53]]);
const e6 = eSum([[62],[MSI_min63],[-MSI_2_53]]);
const e7 = eSum([[3009], [9]]);
const e8 = eSum([[3009], [2]]);
const e9 = eSum([[MSI_2_53],[0]]);
const ea = eSum([[MSI_2_53],[-1]]);
const eb = eSum([[MSI_2_53],[+1]]);

const N1 = [4220107938567023, 8.795405735663742e+30, 2.666668833599244e+47];
const D1 = [604814597353253, 2.941662261791943e+31];

const N2 = [
    1511714056433609,
    1.9588659696103412e+31,
    4.121622845731378e+46,
    2.2078201987714595e+63,
    2.500962259235055e+79,
    2.6404956320519508e+95,
    1.8029971214264133e+111,
    4.10694639038906e+125,
    1.3483846944127788e+143
];
const D2 = [
    37174531114061,
    8.95616194410289e+30,
    1.1879369517265606e+46,
    9.112820412592545e+61,
    5.503733476158258e+78
];

describe('eLongDivide', function() {
	it('should correctly do long division, returning the correct quotient and remainder of some Shewchuk expansions', 
	function() {
        testLongDivide(e7, [10]);
        testLongDivide(e1, [MSI]);
        testLongDivide(e1, [MSI_plus1]);
        testLongDivide(e1, [MSI_min1]);
        testLongDivide(e1, [2*MSI]);
        testLongDivide(e2, [MSI]);
        testLongDivide(e2, [2*MSI]);
        testLongDivide(e3, [MSI]);
        testLongDivide(e4, [MSI]);
        testLongDivide(e5, [MSI]);
        testLongDivide(e6, [MSI]);
        testLongDivide([81064793292668910], [93]);
        testLongDivide([4],[2]);
        testLongDivide([4],[3]);
        testLongDivide([1],[3]);
        testLongDivide([MSI],e5);
        testLongDivide([MSI_2_53],e9);
        testLongDivide([MSI_2_53],ea);
        testLongDivide([MSI_2_53],eb);

        testLongDivide(N1,D1);
        testLongDivide(N2,D2);

        const count = 1000;
        for (let i=0; i<count; i++) {
            let a = getRandomNumber();
            let b = getRandomNumber();

            testLongDivide(a,b);
        }
    });
});


/**
 * 
 * @param N$ 
 * @param D$ 
 */
function testLongDivide(N$: number[], D$: number[]) {
    let N: number[] = [];
    let D: number[] = [];
    // do for all combinations of signs of 'N' and 'D'
    for (let i=1; i<=9; i++) {
        if (i === 1) {
            N = N$;
            D = D$;
        } else if (i === 2) {
            N = eNegativeOf(N$);
            D = D$;
        } else if (i === 3) {
            N = N$;
            D = eNegativeOf(D$);
        } else if (i === 4) {
            N = eNegativeOf(N$);
            D = eNegativeOf(D$);
        } else if (i === 5) {
            N = [0];
            D = D$;
        } else if (i === 6) {
            N = [0];
            D = eNegativeOf(D$);
        } else if (i === 7) {
            N = N$;
            D = [0];
        } else if (i === 8) {
            N = eNegativeOf(N$);
            D = [0];
        } else if (i === 9) {
            N = [0];
            D = [0];
        }

        //console.log('good?: ', test(N,D));
        let res = test(N,D);
        assert(res === true, res as string);
    }
}


/**
 * 
 * @param N
 * @param D 
 */
function test(N: number[], D: number[]) {
    let div: number[];
    let rem: number[];
    try {
        ({ div, rem } = eLongDivide(N,D));
        //console.log('N', N);
        //console.log('D', D);
        //console.log('div', div);
        //console.log('rem', rem);
    } catch (error) {
        let signD = sign(D[D.length-1]);
        if (signD === 0) {
            return true;  // it *should* error
        } else {
            return '' +
`test -2 fails: an error should not be thrown!
N: ${N}
D: ${D}
Error: ${error}
`;
        }
    }

    N = Array.isArray(N) ? N : [N];
    D = Array.isArray(D) ? D : [D];

    ///////////////////////////////////////////////////
    // TEST -1
    ///////////////////////////////////////////////////
    // `div` and `rem` must be integers
    ///////////////////////////////////////////////////
    div = eCompress(div);
    rem = eCompress(rem);
    if (!eIsInteger(div) || !eIsInteger(rem)) {
        return '' +
`test -1 fails: either 'div' or 'rem' is not an integer
N: ${N}
D: ${D}
div: ${div}
rem: ${rem}
`;
    }

    // Calculate N_
    let N_ = expansionProduct(div, D);
    N_ = eCompress(eSum([N_, rem]));

    ///////////////////////////////////////////////////
    // TEST 0
    ///////////////////////////////////////////////////
    // N_ must be a valid Shewchuk expansion - this
    // should really be implicit but it doesn't hurt
    // to test it
    ///////////////////////////////////////////////////
    let isValid = true;
    for (let i=0; i<N_.length-1; i++) {
        if (isAdjacent(N_[i], N_[i+1])) {
            isValid = false;
            break;
        }
    }
    isValid = isValid && isNonOverlappingAll(N_);
    if (!isValid) {
        return '' +
`test 0 fails: N_ is not a valid Shewchuk expansion
N: ${N}
N_: ${N_}
D: ${D}
div: ${div}
rem: ${rem}
`;
    }

    ///////////////////////////////////////////////////
    // TEST 1
    ///////////////////////////////////////////////////
    // This must be true exactly: 
    // N = D*div + rem = N_
    ///////////////////////////////////////////////////

    // Compare N_ with N
    if (eCompare(N, N_) !== 0) { 
        console.log('test 1 fails: N_ !== N');
        console.log(`N  is: `, N);
        console.log(`N_ is: `, N_);
        console.log(`N_ - N is: `, eDiff(N_,N));
        return '' +
`test 1 fails: N_ !== N
N: ${N}
N_: ${N_}
D: ${D}
div: ${div}
rem: ${rem}
`;
    }


    ///////////////////////////////////////////////////
    // TEST 2
    ///////////////////////////////////////////////////
    // |remainder| < |divisor|
    ///////////////////////////////////////////////////
    let absRem = eAbs(rem);
    let absD = eAbs(D);
    let diff = eCompress(eDiff(absRem, absD));
    if (diff[diff.length-1] >= 0) {
        console.log('test 2 fails: |remainder| >= |divisor|')
        return '' +
`test 2 fails: |remainder| >= |divisor|
N: ${N}
N_: ${N_}
D: ${D}
div: ${div}
rem: ${rem}
`;
    }


    ///////////////////////////////////////////////////
    // TEST 3
    ///////////////////////////////////////////////////
    // `/` and `%` signs must follow bigint conventions:
    //
    // `/`: expect `sign(div) === sign(n) * sign(d)`, e.g.
    // 
    // console.log(' 7n /  3n =  2n');
    // console.log('-7n /  3n = -2n');
    // console.log(' 7n / -3n = -2n');
    // console.log('-7n / -3n =  2n');
    //
    // `%`: expect `sign(rem) === sign(n)`, e.g.
    // 
    // console.log(' 7n %  3n =  1');
    // console.log('-7n %  3n = -1');
    // console.log(' 7n % -3n =  1');
    // console.log('-7n % -3n = -1');
    ///////////////////////////////////////////////////
    let signN = sign(N[N.length-1]);
    let signD = sign(D[D.length-1]);
    let signDiv = sign(div[div.length-1]);
    let signRem = sign(rem[rem.length-1]);

    if (signDiv !== 0) {
        if (signDiv !== signN * signD) {
            return '' +
`test 3 fails: sign(div) !== sign(n) * sign(d)
N: ${N}
N_: ${N_}
D: ${D}
div: ${div}
rem: ${rem}
`;
        }
    }

    if (signRem !== 0) {
        if (signRem !== signN) {
            return '' +
`test 3 fails: sign(rem) !== sign(n)
N: ${N}
N_: ${N_}
D: ${D}
div: ${div}
rem: ${rem}
`;
        }
    }


    // TEST 4????
    return true;
}


function getRandomNumber() {
    let num = Math.round(Math.random() * 10) + 1;
    let n = scaleFloatsToInts([...Array(num).keys()]
        .map((c,i) => Math.random() * 2**(i*53)));

    return n;
}


/**
 * 
 * @param as 
 * @returns 
 */
function scaleFloatsToInts(as: number[]) {
    let e = -1024;
    for (let i=0; i<as.length; i++) {
        let a = as[i];
        let scaleFactor = -exponent(a) + bitLength(a) - 1;
        if (scaleFactor > e) {
            e = scaleFactor;
        }
    }

    return as.map(a => a*2**e);
}
