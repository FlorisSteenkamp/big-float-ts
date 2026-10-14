
;// ./src/basic/split-factor.ts
/**
 * The Veltkamp splitting factor for doubles, `2**27 + 1`, i.e.
 * `2**s + 1` with `s === Math.ceil(p/2)` where p (=== 53) is the number of
 * significand bits in a double.
 *
 * * used by `split` and (inlined) by `twoProduct`, `twoSquare` and
 * `scaleExpansion`
 */ const SPLIT_FACTOR = 134217729; // 2**27 + 1


;// ./src/basic/two-product.ts

/**
 * Returns the exact result of multiplying two doubles. 
 * 
 * * the resulting array is the reverse of the standard twoSum in the literature.
 * 
 * Theorem 18 (Shewchuk): Let a and b be p-bit floating-point numbers, where 
 * p >= 6. Then the following algorithm will produce a nonoverlapping expansion 
 * x + y such that ab = x + y, where x is an approximation to ab and y 
 * represents the roundoff error in the calculation of x. Furthermore, if 
 * round-to-even tiebreaking is used, x and y are non-adjacent.
 * 
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 * 
 * * **overflow / underflow:** the inlined split overflows (giving NaN) for 
 * |a| > ~2^996 (or |b| > ~2^996) and the result is only exact if the
 * product does not underflow, i.e. roughly |ab| > 2^-969
 * 
 * @param a A double
 * @param b Another double
 */ function twoProduct(a, b) {
    const x = a * b;
    // inlined: [ah, al] = split(a)
    const c = SPLIT_FACTOR * a;
    const ah = c - (c - a);
    const al = a - ah;
    // inlined: [bh, bl] = split(b)
    const d = SPLIT_FACTOR * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const y = al * bl - (x - ah * bh - al * bh - ah * bl);
    return [
        y,
        x
    ];
}


;// ./src/double-expansion/merge.ts
/**
 * Returns the result of merging an expansion e and f into a single expansion, 
 * in order of nondecreasing magnitude (possibly with interspersed zeros). 
 * (This function is zero-eliminating)
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a floating point expansion
 * @param f another floating point expansion
 */ function merge(e, f) {
    const lenE = e.length;
    const lenF = f.length;
    let i = 0;
    let j = 0;
    const merged = [];
    while(i < lenE && j < lenF){
        if (e[i] === 0) {
            i++;
            continue;
        }
        if (f[j] === 0) {
            j++;
            continue;
        }
        if (Math.abs(e[i]) <= Math.abs(f[j])) {
            merged.push(e[i]);
            i++;
        } else {
            merged.push(f[j]);
            j++;
        }
    }
    while(i < lenE){
        merged.push(e[i]);
        i++;
    }
    while(j < lenF){
        merged.push(f[j]);
        j++;
    }
    if (merged.length === 0) {
        return [
            0
        ];
    }
    return merged;
}


;// ./src/double-expansion/fast-expansion-sum.ts

/**
 * Returns the result of adding two expansions.
 *
 * Theorem 13: Let e = sum_(i=1)^m(e_i) and f = sum_(i=1)^n(f_i) be strongly
 * nonoverlapping expansions of m and n p-bit components, respectively, where
 * p >= 4. Suppose that the components of both e and f are sorted in order of
 * increasing magnitude, except that any of the e_i or f_i may be zero. On a
 * machine whose arithmetic uses the round-to-even rule, the following algorithm
 * will produce a strongly nonoverlapping expansion h such that
 * sum_(i=1)^(m+n)(e_i + f_i) = e + f, where the components of h are also in
 * order of increasing magnitude, except that any of the h_i may be zero.
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 *
 * * `fastTwoSum` and `twoSum` are inlined for performance - calling them is
 * about 2x slower due to the arrays they return
 * * zero components are eliminated from the result
 */ function fastExpansionSum(e, f) {
    const g = merge(e, f);
    const len = g.length;
    if (len === 1) {
        return g;
    }
    const h = [];
    // inlined: [hh, q] = fastTwoSum(g[1], g[0])
    const a = g[1];
    const b = g[0];
    let q = a + b;
    const hh = b - (q - a);
    if (hh !== 0) {
        h.push(hh);
    }
    for(let i = 2; i < len; i++){
        // inlined: [hh, q] = twoSum(q, g[i])
        const b = g[i];
        const R = q + b;
        const _ = R - q;
        const hh = q - (R - _) + (b - _);
        if (hh !== 0) {
            h.push(hh);
        }
        q = R;
    }
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    return h;
}


;// ./src/double-expansion/e-negative-of.ts
/**
 * Returns the negative of the given floating point expansion.
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a floating point expansion
 */ function eNegativeOf(e) {
    const m = e.length;
    const h = new Array(m);
    for(let i = 0; i < m; i++){
        h[i] = -e[i];
    }
    return h;
}


;// ./src/double-expansion/e-diff.ts


/**
 * Returns the difference between two floating point expansions, i.e. e - f.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a floating point expansion
 * @param f another floating point expansion
 */ function eDiff(e, f) {
    const g = eNegativeOf(f);
    return fastExpansionSum(e, g);
}


;// ./src/double-expansion/e-estimate.ts
/**
 * Returns the result of the given floating point expansion rounded to a double
 * floating point number. 
 * 
 * The result is within 1 ulps of the actual value, e.g. imagine the worst case
 * situation where we add (in 4dot4) 1111.1000 + 0.000011111111... The result
 * will be 1111.1000 whereas as the correct result should be 1111.1001 and we
 * thus lost 1 ulp of accuracy. It does not matter that the expansion contain
 * several floats since none is overlapping.
 * 
 * See Shewchuk https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 * 
 * @param e a floating point expansion
 */ function eEstimate(e) {
    let Q = e[0];
    for(let i = 1; i < e.length; i++){
        Q += e[i];
    }
    return Q;
}


;// ./src/basic/two-diff.ts
/**
 * Returns the exact result of subtracting b from a (as a floating point 
 * expansion).
 * @param a 
 * @param b 
 */ function twoDiff(a, b) {
    const x = a - b;
    const bvirt = a - x;
    const y = a - (x + bvirt) + (bvirt - b);
    return [
        y,
        x
    ];
}


;// ./src/double-expansion/e-compress.ts
/**
 * Returns the result of compressing the given Shewchuk floating point expansion.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * Theorem 23 (Shewchuk): Let `e = sum_(i=1)^m(e_i)` be a nonoverlapping 
 * expansion of m p-bit components, where m >= 3.
 * 
 * Suppose that the components of `e` are sorted in order of increasing magnitude,
 * except that any of the e_i may be zero.
 * 
 * Then the following algorithm will produce a nonoverlapping expansion 
 * (nonadjacent if round-to even tiebreaking is used) such that 
 * `h = sum_(i=1)^n(h_i) = e`, where the components `h_i` are in order of increasing
 * magnitude. If `h != 0`, none of the `h_i` will be zero. Furthermore, the largest 
 * component `h_n` approximates `h` with an error smaller than `ulp(h_n)`.
 */ function eCompress(e) {
    const e_ = e.slice();
    const m = e_.length;
    if (m === 1) {
        return e_;
    }
    // an empty expansion represents 0
    if (m === 0) {
        return [
            0
        ];
    }
    let Q = e_[m - 1];
    let bottom = m;
    for(let i = m - 2; i >= 0; --i){
        const a = Q;
        const b = e_[i];
        Q = a + b;
        const bv = Q - a;
        const q = b - bv;
        if (q) {
            e_[--bottom] = Q;
            Q = q;
        }
    }
    let top = 0;
    for(let i = bottom; i < m; ++i){
        const a = e_[i];
        const b = Q;
        Q = a + b;
        const bv = Q - a;
        const q = b - bv;
        if (q) {
            e_[top++] = q;
        }
    }
    e_[top++] = Q;
    e_.length = top;
    return e_;
}


;// ./src/geometric-primitives/orient2d.ts






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
 */ function orient2d(A, B, C) {
    const detleft = (A[0] - C[0]) * (B[1] - C[1]);
    const detright = (A[1] - C[1]) * (B[0] - C[0]);
    const det = detleft - detright;
    let detsum;
    if (detleft > 0) {
        if (detright <= 0) {
            // Anti-clockwise
            return det;
        } else {
            detsum = detleft + detright;
        }
    } else if (detleft < 0) {
        if (detright >= 0) {
            // Clockwise
            return det;
        } else {
            detsum = -detleft - detright;
        }
    } else {
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
    if (acxtail === 0 && acytail === 0 && bcxtail === 0 && bcytail === 0) {
        // Straight
        return det;
    }
    const errbound = ccwerrboundC * detsum + resulterrbound * Math.abs(det);
    det += acx * bcytail + bcy * acxtail - (acy * bcxtail + bcx * acytail);
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


;// ./src/basic/fast-two-diff.ts
/**
 * Returns the difference and exact error of subtracting two floating point 
 * numbers. 
 * Uses an EFT (error-free transformation), i.e. a-b === x+y exactly.
 * The returned result is a non-overlapping expansion (smallest value first!).
 * 
 * Precondition: abs(a) >= abs(b) - A fast test that can be used is 
 * (a > b) === (a > -b)
 * 
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */ function fastTwoDiff(a, b) {
    const x = a - b;
    const y = a - x - b;
    return [
        y,
        x
    ];
}


;// ./src/basic/fast-two-sum.ts
/**
 * Returns the sum and exact error of adding two floating point numbers. 
 * Uses an EFT (error-free transformation), i.e. a+b === x+y exactly.
 * The returned sum is a non-overlapping expansion (smallest value first!).
 * 
 * Precondition: abs(a) >= abs(b) - A fast test that can be used is 
 * (a > b) === (a > -b)
 * 
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */ function fastTwoSum(a, b) {
    const x = a + b;
    return [
        b - (x - a),
        x
    ];
}
// inlined form (for use in hot loops):
//const R = a + b; const r = b - (R - a); return [r, R];


;// ./src/basic/two-sum.ts
/**
 * Returns the exact result of adding two doubles.
 * 
 * * the resulting array is the reverse of the standard twoSum in the literature.
 * 
 * Theorem 7 (Knuth): Let a and b be p-bit floating-point numbers. Then the 
 * following algorithm will produce a nonoverlapping expansion x + y such that 
 * a + b = x + y, where x is an approximation to a + b and y is the roundoff 
 * error in the calculation of x.
 * 
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */ function twoSum(a, b) {
    const x = a + b;
    const bv = x - a;
    return [
        a - (x - bv) + (b - bv),
        x
    ];
}
// inlined form (for use in hot loops):
//const R = a + b; const _ = R - a; const r = (a - (R - _)) + (b - _); return [r,R]


;// ./src/basic/two-square.ts

/**
 * Returns the exact result of squaring a double.
 * 
 * * the resulting expansion is least significant double first.
 * 
 * Theorem 18 (Shewchuk): Let a and b be p-bit floating-point numbers, where 
 * p >= 6. Then the following algorithm will produce a nonoverlapping expansion 
 * x + y such that ab = x + y, where x is an approximation to ab and y 
 * represents the roundoff error in the calculation of x. Furthermore, if 
 * round-to-even tiebreaking is used, x and y are non-adjacent.
 * 
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 * 
 * * **overflow / underflow:** the inlined split overflows (giving NaN) for 
 * |a| > ~2^996 and the result is only exact if the square does not 
 * underflow, i.e. roughly a^2 > 2^-969
 * 
 * @param a A double
 */ function twoSquare(a) {
    const x = a * a;
    // inlined: [ah, al] = split(a)
    const c = SPLIT_FACTOR * a;
    const ah = c - (c - a);
    const al = a - ah;
    const y = al * al - (x - ah * ah - 2 * (ah * al));
    return [
        y,
        x
    ];
}


;// ./src/basic/split.ts

/**
 * Returns the result of splitting a double into 2 26-bit doubles.
 * 
 * Theorem 17 (Veltkamp-Dekker): Let a be a p-bit floating-point number, where
 * p >= 3. Choose a splitting point s such that p/2 <= s <= p-1. Then the 
 * following algorithm will produce a (p-s)-bit value a_hi and a 
 * nonoverlapping (s-1)-bit value a_lo such that abs(a_hi) >= abs(a_lo) and
 * a = a_hi + a_lo.
 * 
 * see e.g. [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * * **overflow:** `a * (2**27 + 1)` overflows (giving NaN) for 
 * |a| > ~2^996
 * 
 * @param a A double floating point number
 */ function split(a) {
    const c = SPLIT_FACTOR * a;
    const a_h = c - (c - a);
    const a_l = a - a_h;
    return [
        a_h,
        a_l
    ];
}
// inlined form (for use in hot loops) - input a, output a_h, a_l:
// const c = f * a; const a_h = c - (c - a); const a_l = a - a_h; return [a_h, a_l];


;// ./src/basic/reduce-significand.ts
/**
 * Truncates a floating point value's significand and returns the result. 
 * Similar to split, but with the ability to specify the number of bits to keep.
 * 
 * Theorem 17 (Veltkamp-Dekker): Let a be a p-bit floating-point number, where
 * p >= 3. Choose a splitting point s such that p/2 <= s <= p-1. Then the 
 * following algorithm will produce a (p-s)-bit value a_hi and a 
 * nonoverlapping (s-1)-bit value a_lo such that abs(a_hi) >= abs(a_lo) and
 * a = a_hi + a_lo.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * * **overflow:** `a * (2**(53-bits) + 1)` overflows (giving NaN) for 
 * |a| > ~2^(1023 - (53-bits)), e.g. ~2^996 when keeping 26 bits
 * 
 * @param a a double
 * @param bits the number of significand bits to leave intact
 */ function reduceSignificand(a, bits) {
    const s = 53 - bits;
    const f = 2 ** s + 1;
    const c = f * a;
    const r = c - (c - a);
    return r;
}


;// ./src/basic/dd-to-double.ts
/**
 * Returns a double floating point number by truncating the given double-double
 * floating point number.
 * 
 * * usually better to inline this function: `return dd[1]`
 */ function ddToDouble(dd) {
    return dd[1];
}


;// ./src/basic/double-to-dd.ts
/**
 * Returns a double-double floating point number from the given double
 * floating point number.
 * 
 * * usually better to inline this function: `return [0,d]`
 */ function doubleToDd(d) {
    return [
        0,
        d
    ];
}


;// ./src/double-representation/double-view.ts
/**
 * A shared scratch `DataView` over 8 bytes used to inspect the IEEE-754 bits
 * of a double without allocating on every call.
 *
 * * **not re-entrant**: callers must read what they need immediately after
 * writing (which is always the case in this single-threaded library).
 */ const doubleView = new DataView(new ArrayBuffer(8));
/**
 * Returns the high 32-bit word (sign, 11 exponent bits and the top 20 fraction
 * bits) of the given double.
 */ function getHiWord(a) {
    doubleView.setFloat64(0, a);
    return doubleView.getUint32(0);
}


;// ./src/double-representation/double-to-octets.ts
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)

/** 
 * Returns the ieee-574 8 bytes composing the given double, starting from the
 * sign bit and ending in the lsb of the significand.
 * e.g. 123.456 -> [64, 94, 221, 47, 26, 159, 190, 119] 
 */ function doubleToOctets(number) {
    doubleView.setFloat64(0, number, false);
    const octets = [];
    for(let i = 0; i < 8; i++){
        octets.push(doubleView.getUint8(i));
    }
    return octets;
}


;// ./src/double-representation/double-to-binary-string.ts
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)

function doubleToBinaryString(number) {
    return octetsToBinaryString(doubleToOctets(number));
}
/**
 * @param octets The 8 bytes composing a double (msb first)
 */ function octetsToBinaryString(octets) {
    return octets.map(int8ToBinaryString).join('');
}
/**
 * intToBinaryString(8) -> "00001000"
 */ function int8ToBinaryString(i) {
    return i.toString(2).padStart(8, '0');
}


;// ./src/double-representation/parse-double.ts
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)


/**
 * Returns the relevant parts of the given IEEE-754 double. The returned 
 * exponent has been normalized (i.e. 1023 has been subtracted) and the 
 * significand has the hidden bit added if appropriate.
 * See https://github.com/bartaz/ieee754-visualization
 */ function parseDouble(x) {
    const parts = doubleToOctets(x);
    const p0 = parts[0];
    const p1 = parts[1];
    const sign = p0 >> 7;
    const exponent_ = ((p0 & 0b0111_1111) << 4) + ((p1 & 0b11110000) >> 4);
    //---- Check for negative / positive zero / denormalized numbers.
    const hiddenMsb = exponent_ === 0 ? 0 : 16;
    // Note: exponent === 0 => 0 or denormalized number (a.k.a. subnormal number).
    const exponent = exponent_ === 0 ? exponent_ - 1022 // Subnormals use a biased exponent of 1 (not 0!)
     : exponent_ - 1023;
    //---- Break up the significand into bytes
    const significand = parts.slice(1);
    significand[0] = (p1 & 0b0000_1111) + hiddenMsb;
    return {
        sign,
        exponent,
        significand
    };
}
/**
 * Returns the relevant parts of the given IEEE-754 double.
 * See https://github.com/bartaz/ieee754-visualization.
 * This is a slower version of parseDouble that gives binary string 
 * representations of the components.
 */ function parseDoubleDetailed(x) {
    const str = doubleToBinaryString(x);
    // sign{1} exponent{11} fraction{52} === 64 bits (+1 hidden!)
    const [, sign, exponent, significand] = str.match(/^(.)(.{11})(.{52})$/);
    const exponent_ = parseInt(exponent, 2);
    const hidden = exponent_ === 0 ? "0" : "1";
    return {
        full: sign + exponent + hidden + significand,
        sign,
        exponent,
        hidden,
        significand
    };
}


;// ./src/double-representation/get-highest-set-bit.ts

/**
 * Returns the highest set bit of the given double. If no bit is set (input
 * === 0 or +/-inf or NaN) returns NaN.
 */ function getHighestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no highest set bit
        return NaN;
    }
    // At this point there must be a highest set bit (always === 52 if the
    // number is not a subnormal.
    doubleView.setFloat64(0, a);
    const hi = doubleView.getUint32(0);
    if ((hi & 0x7ff00000) !== 0) {
        return 52; // normal number => the hidden bit
    }
    // subnormal
    const sigHi = hi & 0xfffff;
    if (sigHi !== 0) {
        return 32 + 31 - Math.clz32(sigHi);
    }
    return 31 - Math.clz32(doubleView.getUint32(4));
}


;// ./src/double-representation/get-lowest-set-bit.ts

/**
 * Returns the lowest set bit of the given number's significand (where the lsb
 * is bit 0 and the msb is bit 52). If no bit is set (input === 0 or +-inf or
 * NaN) returns NaN.
 */ function getLowestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no lowest set bit
        return NaN;
    }
    doubleView.setFloat64(0, a);
    const lo = doubleView.getUint32(4);
    if (lo !== 0) {
        return 31 - Math.clz32(lo & -lo);
    }
    // Note: the significand includes the hidden bit!
    const hi = doubleView.getUint32(0);
    const sigHi = hi & 0xfffff | ((hi & 0x7ff00000) === 0 ? 0 : 0x100000);
    return 32 + 31 - Math.clz32(sigHi & -sigHi);
}


;// ./src/double-representation/exponent.ts

/**
 * Returns the normalized exponent of the given number.
 * @param a A double
 */ function exponent(a) {
    const expField = getHiWord(a) >>> 20 & 0x7ff;
    // Subnormals (and 0) use a biased exponent of 1 (not 0!)
    return expField === 0 ? -1022 : expField - 1023;
}


;// ./src/double-representation/is-bit-aligned.ts



/**
 * Returns true if the given number is bit-aligned in the sense that its a 
 * multiple of a given power of 2, say e, and such that the number, say a, 
 * conforms to: a/2^e < 2^(l-e), where l is the max allowed bit length. 
 * This essentially means the numbers act somewhat like fixed-point numbers 
 * which can drastically speed up some geometric algorithms and also reduce 
 * their complexity.
 * 
 * Visually:
 * These numbers (a,b and c) are bit aligned with e === 3 and max 
 * bitlength === 6:  
 *    a -> 00|101100|000  
 *    b -> 00|000100|000  
 *    c -> 00|110111|000  
 * These are not  
 *    a -> 01|101100|000  
 *    b -> 00|000100|000  
 * These are not  
 *    a -> 00|101100|000  
 *    b -> 00|000100|100  
 * These are not  
 *    a -> 00|101100|100  
 *    b -> 00|000100|100  
 * @param a The number to check
 * @param maxBitLength The max allowed bitlength
 * @param gridSpacingExponent The grid spacing === 2^gridSpacingExponent
 */ function isBitAligned(a, maxBitLength, gridSpacingExponent) {
    if (a === 0) {
        return true;
    }
    const e = exponent(a);
    const maxSetBit = getHighestSetBit(a) - 52 + e;
    const minSetBit = getLowestSetBit(a) - 52 + e;
    const minBitBigEnough = minSetBit >= gridSpacingExponent;
    const maxBitSmallEnough = maxSetBit <= maxBitLength - 1 + gridSpacingExponent;
    return minBitBigEnough && maxBitSmallEnough;
}


;// ./src/double-representation/msb-exponent.ts


/**
 * Returns the true exponent of the msb that is set of the given number or
 * NaN if a === 0 or +-inf or NaN.
 * @param a A double
 */ function msbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
        return NaN;
    }
    const e = exponent(a);
    // Will return e for all but subnormal numbers
    return getHighestSetBit(a) - 52 + e;
}


;// ./src/double-representation/lsb-exponent.ts


/**
 * Returns the true exponent of the lsb that is set of the given number or
 * NaN if a === 0 or +-inf or NaN.
 * @param a A double
 */ function lsbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
        return NaN;
    }
    const e = exponent(a);
    return getLowestSetBit(a) - 52 + e;
}


;// ./src/double-expansion/e-sign.ts
/**
 * Returns the sign of the given expansion such that a negative value means a
 * negative sign and a positive value means a positive sign, 0 meaning 0 of
 * course.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * From Shewchuk: "A nonoverlapping expansion is desirable because it is easy to 
 * determine its sign (take the sign of the largest component) ... "
 * 
 * @param e A floating point expansion with zeroes eliminated.
 */ function eSign(e) {
    return e[e.length - 1];
}


;// ./src/double-representation/bit-length.ts





/**
 * Returns the bit-length of the significand of the given number in such a way
 * that trailing zeros are not counted.
 * @param a A double precision floating point number
 */ function bitLength(a) {
    if (a === 0) {
        return 0;
    }
    return getHighestSetBit(a) - getLowestSetBit(a) + 1;
}
/**
 * Returns the bit-length of the significand of the given floating point 
 * expansion in such a way that trailing zeros are not counted.
 * * precondition: subnormals not currently supported
 * @param a A double precision floating point expansion
 */ function expBitLength(a) {
    const a_ = eCompress(a);
    if (eSign(a_) === 0) {
        return 0;
    }
    const msbyte = a_[a_.length - 1];
    const lsbyte = a_[0];
    return exponent(msbyte) - exponent(lsbyte) + (53 - getLowestSetBit(lsbyte));
}


;// ./src/double-representation/significand.ts

/**
 * Return the significand of the given double with the hidden bit added (in case
 * a is not subnormal or 0, etc.)
 * @param a A double
 */ function significand(a) {
    return parseDouble(a).significand;
}


;// ./src/double-expansion/e-to-bitlength.ts




/**
 * Returns a floating point expansion accurate to the given number of bits. 
 * Extraneous bits are discarded.
 * @param a a floating point expansion
 * @param l the number of accurate bits to keep
 */ // TODO - make faster
function eToBitlength(a, l) {
    a = eCompress(a);
    if (eSign(a) === 0) {
        return [
            0
        ];
    }
    const maxMsb = msbExponent(a[a.length - 1]);
    let msb = maxMsb;
    let i = a.length - 1; // start at most significant byte
    while(i > 0){
        const msb_ = msbExponent(a[i - 1]);
        if (maxMsb - msb_ > l) {
            break;
        }
        msb = msb_;
        i--;
    }
    const keepBits = Math.min(l - (maxMsb - msb), 53);
    const b = a[i];
    const result = a.slice(i);
    if (keepBits > 0) {
        result[0] = reduceSignificand(b, keepBits);
    } else {
        // The component lies just below the bits being kept (its msb is one
        // position below the kept lsb) so it rounds to either 0 or
        // `±2^(msb+1)`. (`reduceSignificand` is not valid for 0 bits.)
        const p = 2 ** msb;
        const absB = Math.abs(b);
        // On an exact tie the next lower component (if any) decides,
        // otherwise round to even (i.e. 0).
        const roundUp = absB > p || i > 0 && Math.sign(a[i - 1]) === Math.sign(b);
        if (!roundUp) {
            // here `i` is not the top component (since then `keepBits >= 1`)
            return result.slice(1);
        }
        result[0] = Math.sign(b) * 2 * p;
    }
    return result;
}


;// ./src/double-expansion/scale-expansion.ts

/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 19 (Shewchuk): Let e = sum_(i=1)^m(e_i) be a nonoverlapping expansion
 * of m p-bit components, and const b be a p-bit value where p >= 4. Suppose that
 * the components of e are sorted in order of increasing magnitude, except that
 * any of the e_i may be zero. Then the following algorithm will produce a
 * nonoverlapping expansion h such that h = sum_(i=1)^(2m)(h_i) = be, where the
 * components of h are also in order of increasing magnitude, except that any of
 * the h_i may be zero. Furthermore, if e is nonadjacent and round-to-even
 * tiebreaking is used, then h is non-adjacent.
 *
 * * the primitives (`twoProduct`, `twoSum`, `fastTwoSum`) are inlined for
 * performance - calling them is 2-7x slower due to the arrays they return
 * * zero components are eliminated from the result
 * * subject to the same overflow / underflow limits as `twoProduct` (e.g. 
 * NaN results for components or `b` with magnitude > ~2^996)
 *
 * @param e a double floating point expansion
 * @param b a double
 */ function scaleExpansion(e, b) {
    const m = e.length;
    // an empty expansion represents 0
    if (m === 0) {
        return [
            0
        ];
    }
    // split `b` once (`[bh, bl] = split(b)`)
    const d = SPLIT_FACTOR * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const h = [];
    // inlined: [hh, q] = twoProduct(e[0], b)
    const a = e[0];
    let q = a * b;
    const c = SPLIT_FACTOR * a;
    const ah = c - (c - a);
    const al = a - ah;
    const hh = al * bl - (q - ah * bh - al * bh - ah * bl);
    if (hh !== 0) {
        h.push(hh);
    }
    for(let i = 1; i < m; i++){
        // inlined: [t, T] = twoProduct(e[i], b)
        const a = e[i];
        const T = a * b;
        const c = SPLIT_FACTOR * a;
        const ah = c - (c - a);
        const al = a - ah;
        const t = al * bl - (T - ah * bh - al * bh - ah * bl);
        // inlined: [hh, q_] = twoSum(q, t)
        const q_ = q + t;
        const bv = q_ - q;
        const hh = q - (q_ - bv) + (t - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        // inlined: [hhh, q] = fastTwoSum(T, q_)
        const xx = T + q_;
        const hhh = q_ - (xx - T);
        if (hhh !== 0) {
            h.push(hhh);
        }
        q = xx;
    }
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    return h;
}
/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * identical to `scaleExpansion` but with the parameters swapped
 *
 * @param b a double
 * @param e a double floating point expansion
 */ function scaleExpansion2(b, e) {
    return scaleExpansion(e, b);
}


;// ./src/double-expansion/expansion-product.ts


/**
 * Returns the product of two double floating point expansions.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * * the result is not compressed, call `eCompress` on the result if required.
 * 
 * As per Shewchuk in the above paper: "To find the product of two expansions
 * e and f, use SCALE-EXPANSION (with zero elimination) to form the expansions
 * ef_1, ef_2, ..., then sum these using a distillation tree."
 * 
 * A distillation tree used with fastExpansionSum will give O(k*log k) vs O(k^2)
 * operations, which is what is implemented here.
 * @param e a double floating point expansion
 * @param f another double floating point expansion
 */ function expansionProduct(e, f) {
    if (e.length === 1) {
        return scaleExpansion(f, e[0]);
    }
    if (f.length === 1) {
        return scaleExpansion(e, f[0]);
    }
    if (e.length === 0 || f.length === 0) {
        return [
            0
        ];
    }
    // form the expansions e*f_1, e*f_2, ... (iterating over the shorter one)
    if (e.length < f.length) {
        [e, f] = [
            f,
            e
        ];
    }
    let terms = [];
    for(let i = 0; i < f.length; i++){
        terms.push(scaleExpansion(e, f[i]));
    }
    // ... then sum them pairwise using a distillation tree
    while(terms.length > 1){
        const next = [];
        for(let i = 0; i < terms.length; i += 2){
            next.push(i + 1 < terms.length ? fastExpansionSum(terms[i], terms[i + 1]) : terms[i]);
        }
        terms = next;
    }
    return terms[0];
}


;// ./src/double-expansion/e-div.ts







/**
 * Returns the result of a/b using Goldschmidt division. 
 * 
 * The result will only be exact if b|a, i.e. if b divides a exactly, else the 
 * result will be rounded to the longest bitlength between a and b.
 * 
 * @param a the numerator
 * @param b the denominator
 * 
 * @param expansionLength the bitlength/53 of the final result, e.g. 1 means
 * standard double precision, 2 means double-double, etc up to a max of about 20 at
 * which point underflow cease precision improvement. If the division is known
 * to be exact beforehand (such as in the pseudo remainder sequence algorithm) 
 * then set expansionLength === 0 and an exact division will be done.
 */ // TODO - test this function properly or replace with a better one
function eDiv(N, D, expansionLength) {
    let D_ = eCompress(D);
    if (eSign(D_) === 0) {
        throw new Error('division by zero');
    }
    let N_ = N;
    let exact = false;
    let resultBitlengthUpperBound = 0;
    if (!expansionLength) {
        const bitlengthN = expBitLength(N_);
        const bitlengthD = expBitLength(D_);
        // resultBitlengthUpperBound is only valid if the division is known
        // to be exact
        resultBitlengthUpperBound = bitlengthN - bitlengthD + 1;
        expansionLength = resultBitlengthUpperBound / 53 + 1;
        exact = true;
    }
    let F = [
        1 / eEstimate(D_)
    ]; // Initial guess - out by 1/2 upls
    let i = 1;
    while(true){
        N_ = eCompress(expansionProduct(N_, F));
        // The precision bitlength doubles on each iteration
        if (i > expansionLength) {
            // we now have roughly double the needed precision - we actually 
            // only require about the precision and then round properly - this
            // could be implemented in the future.
            if (exact) {
                // We must throw away bits known to be zero. 
                // Any bits > expansionLength * 53 must be thrown away as they
                // are wrong - all other bits are exact.
                N_ = eToBitlength(N_, resultBitlengthUpperBound);
                return N_;
            }
            // Returning only significant bits helps with sign determination 
            // later on (`N_` is compressed so its top components are the most
            // significant).
            return N_.slice(Math.max(0, N_.length - expansionLength));
        }
        D_ = eCompress(expansionProduct(D_, F));
        i *= 2;
        // `D_` is now within about 2^(-53*i/2) of 1 so `F` only needs about
        // 53*i significant bits for the next iteration; truncating it (with a
        // generous margin) keeps the expansions from growing without bound
        // and does not affect the exactness of `N_/D_` since both are 
        // multiplied by the same `F`.
        F = eToBitlength(eDiff([
            2
        ], D_), 2 * 53 * i + 53);
    }
}


;// ./src/double-expansion/grow-expansion.ts
/**
 * Returns the result of adding a double to an expansion.
 *
 * Let e be a nonoverlapping expansion of m p-bit components, and let b be a
 * p-bit value where p >= 3. Suppose that the components e_1, ..., e_m are
 * sorted in order of *increasing* magnitude, except that any of the ei may be
 * zero.
 * Then the following algorithm will produce a nonoverlapping expansion such
 * that h = sum_i(h_i) = e + b, where the components h_1, ..., h_(m+1) are also
 * in order of increasing magnitude, except that any of the h_i may be zero.
 * Furthermore, if e is nonadjacent and round-to-even tiebreaking is used, then
 * h is nonadjacent.
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 *
 * * `twoSum` is inlined for performance - calling it is 2-3x slower due to the
 * array it returns
 * * zero components are eliminated from the result
 *
 * @param e A floating point expansion
 * @param b A double
 */ function growExpansion(e, b) {
    const m = e.length;
    let q = b;
    const h = [];
    for(let i = 0; i < m; i++){
        // Note the use of twoSum and not fastTwoSum.
        // inlined: [hh, q] = twoSum(q, e[i])
        const ee = e[i];
        const x = q + ee;
        const bv = x - q;
        const hh = q - (x - bv) + (ee - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        q = x;
    }
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    return h;
}


;// ./src/double-expansion/e-sum.ts



/**
 * Returns the result of summing an array of floating point expansions.
 * 
 * * The result is exact in the form of a non-overlapping floating point 
 * expansion.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param terms An array of numbers to be summed; A term is represented by a 
 * floating point expansion.
 */ // The terms parameter were chosen to always be expansions in order to keep the 
// function monomorhic, but whether it's really worth it I am not sure.
function eSum(terms) {
    let total = [
        0
    ];
    for(let i = 0; i < terms.length; i++){
        const term = terms[i];
        // add
        if (term.length === 1) {
            if (total.length === 1) {
                total = twoSum(total[0], term[0]);
            } else {
                total = growExpansion(total, term[0]);
            }
        } else {
            if (total.length === 1) {
                total = growExpansion(term, total[0]);
            } else {
                total = fastExpansionSum(total, term);
            }
        }
    }
    return total;
}


;// ./src/double-expansion/e-abs.ts

/**
 * Returns the absolute value of the given floating point expansion.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a floating point expansion
 */ function eAbs(e) {
    if (e[e.length - 1] < 0) {
        return eNegativeOf(e);
    }
    return e;
}


;// ./src/double-expansion/e-compare.ts


/**
 * Returns 0 if a === b, a +tive value if a > b or a negative value if a < b.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * "The easiest way to compare two expansions is to subtract one from the other, 
 * and test the sign of the result. An expansion’s sign can be easily tested 
 * because of the nonoverlapping property; simply check the sign of the 
 * expansion's most significant nonzero component..."
 * 
 * @param a a floating point expansion
 * @param b another floating point expansion
 */ function eCompare(a, b) {
    return eSign(eDiff(a, b));
}


;// ./src/double-expansion/e-long-divide.ts









const sign = Math.sign;
function eLongDivide(N, D) {
    // non-finite input would otherwise cause an infinite loop below
    if (!N.every(Number.isFinite) || !D.every(Number.isFinite)) {
        throw new Error('eLongDivide: N and D must be finite');
    }
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
            return {
                div: N,
                rem: [
                    0
                ]
            };
        }
        if (d === -1) {
            return {
                div: eNegativeOf(N),
                rem: [
                    0
                ]
            };
        }
    }
    const signN = sign(N[N.length - 1]);
    if (signN === 0) {
        return {
            div: [
                0
            ],
            rem: [
                0
            ]
        };
    }
    const signD = sign(d);
    const divs = [];
    let oldLen = 0;
    while(true){
        const rems = [];
        // loop from big `n[i]` to small `n[i]`
        for(let i = N.length - 1; i >= 0; i--){
            const n = N[i];
            // `n % d` is the exact rem (for rem < MAX_SAFE_INTEGER) but is preliminary 
            // as it is subject to round-off for rem > MAX_SAFE_INTEGER; thus out by at 
            // most 1/2 ulp
            // Due to roundoff (and the fact we'e using `d` and not `D`!), `_div` does 
            // not necessarily represent the exact quotient.
            const div = Math.round((n - n % d) / d);
            if (div === 0) {
                break;
            }
            // get the remainder by calculating `rem = n - d*div`
            rems.push(scaleExpansion(D, div)); // exact
            divs.push(div);
        }
        N = eCompress(eDiff(N, eSum(rems)));
        if (oldLen === divs.length) {
            break;
        }
        oldLen = divs.length;
    }
    let rem = N;
    let div = eSum(divs.map((d)=>[
            d
        ]));
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
    while(sign(rem[rem.length - 1]) === -signN){
        div = growExpansion(div, sameSign ? -1 : +1);
        rem = eCompress(fastExpansionSum(rem, sameSign ? D : negD));
    }
    // |rem| too large => move it one |D| towards zero
    while(eCompare(eAbs(rem), absD) >= 0){
        div = growExpansion(div, sameSign ? +1 : -1);
        rem = eCompress(fastExpansionSum(rem, sameSign ? negD : D));
    }
    div = eCompress(div);
    return {
        div,
        rem
    };
}


;// ./src/double-expansion/e-int-div.ts

/**
 * Returns the result of the integer division a/b. 
 * 
 * * **precondition:** a and b must be integers, b !== 0
 */ function eIntDiv(a, b) {
    return eLongDivide(a, b).div;
}


;// ./src/double-expansion/e-rem.ts

/**
 * Returns a % b
 * 
 * * **precondition:** a and b must be integers, b !== 0
 */ function eRem(a, b) {
    return eLongDivide(a, b).rem;
}


;// ./src/double-expansion/e-mult-by-2.ts
/**
 * Returns the result of multiplying a floating point expansion by 2.
 * * **error free** unless overflow occurs
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a floating point expansion
 */ function eMultBy2(e) {
    const e_ = [];
    for(let i = 0; i < e.length; i++){
        e_.push(2 * e[i]);
    }
    return e_;
}


;// ./src/double-expansion/e-mult-by-neg-2.ts
/**
 * Multiply a floating point expansion by -2.
 * * **error free** unless overflow occurs
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a floating point expansion
 */ function eMultByNeg2(e) {
    const e_ = [];
    for(let i = 0; i < e.length; i++){
        e_.push(-2 * e[i]);
    }
    return e_;
}


;// ./src/double-expansion/e-div-by-2.ts
/**
 * Returns the result of dividing a floating point expansion by 2.
 * * **error free** unless underflow occurs (a subnormal component may lose its lowest bit)
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a floating point expansion
 */ function eDivBy2(e) {
    const e_ = [];
    for(let i = 0; i < e.length; i++){
        e_.push(0.5 * e[i]);
    }
    return e_;
}


;// ./src/double-expansion/e-product.ts




/**
 * Return the result of multiplying together an array of floating point
 * expansions.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param term an array of multiplicands
 */ function eProduct(term) {
    return eCompress(eProductUncompressed(term));
}
/**
 * Returns the same as `eProduct` but without compressing the result.
 *
 * * not exported from the package - used by `eCalculate` (which sums the
 * products before compression is useful)
 *
 * @param term an array of multiplicands
 */ function eProductUncompressed(term) {
    // the empty product is 1
    if (term.length === 0) {
        return [
            1
        ];
    }
    let product = term[0];
    for(let j = 1; j < term.length; j++){
        const multiplicant = term[j];
        if (multiplicant.length == 1) {
            if (product.length === 1) {
                product = twoProduct(product[0], multiplicant[0]);
            } else {
                product = scaleExpansion(product, multiplicant[0]);
            }
        } else if (product.length === 1) {
            product = scaleExpansion(multiplicant, product[0]);
        } else {
            product = expansionProduct(multiplicant, product);
        }
    }
    return product;
}


;// ./src/double-expansion/e-calculate.ts




/**
 * Return the result of summing an array of terms, each term being an array of
 * floating point expansions to be multiplied together.
 *
 * * the result is not compressed, call `eCompress` on the result if required.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param terms An array of terms to be summed; A term consists of an
 * array of floating point expansions to be multiplied together.
 */ // The terms parameter were chosen to always be expansions in order to keep the
// function monomorhic, but whether it's really worth it I am not sure.
function eCalculate(terms) {
    // Each product is added to the total immediately rather than collecting
    // the products and calling `eSum` - the latter is up to ~20% slower for
    // small terms.
    let total = [
        0
    ];
    for(let i = 0; i < terms.length; i++){
        const product = eProductUncompressed(terms[i]);
        if (product.length === 1) {
            total = total.length === 1 ? twoSum(total[0], product[0]) : growExpansion(total, product[0]);
        } else {
            total = total.length === 1 ? growExpansion(product, total[0]) : fastExpansionSum(total, product);
        }
    }
    return total;
}


;// ./src/double-expansion/e-int-pow.ts


/**
 * Returns a**p, where p is a non-negative integer.
 *
 * * uses 'repeated squaring', i.e. O(log p) expansion multiplications
 *
 * @param a a floating point expansion
 * @param p the power
 */ function eIntPow(a, p) {
    // a^0 === 1
    if (p === 0) {
        return [
            1
        ];
    }
    // a^1 === a
    if (p === 1) {
        return a;
    }
    let result = undefined;
    let base = a;
    while(true){
        if (p % 2 === 1) {
            result = result === undefined ? base : eCompress(expansionProduct(result, base));
        }
        p = Math.floor(p / 2);
        if (p === 0) {
            break;
        }
        base = eCompress(expansionProduct(base, base));
    }
    return result;
}


;// ./src/double-expansion/e-to-double-double.ts

/**
 * Returns the result of converting a floating point expansion to a 
 * double-double precision floating point number.
 * 
 * * uses truncation to convert thus accurate to within 1 ulp on low double;
 * (a slower summing method could reduce the max error to 1/2 ulp)
 */ function eToDd(e) {
    e = eCompress(e);
    const len = e.length;
    if (len === 2) {
        return e; // already a double-double
    } else if (len <= 1) {
        return [
            0,
            e[0]
        ]; // double-doubles have a fixed length of 2
    }
    return [
        e[len - 2],
        e[len - 1]
    ]; // return only most significant parts
}


;// ./src/double-expansion/dd-to-expansion.ts
/**
 * Returns the result of converting a double-double precision floating point
 * number to a floating point expansion.
 */ function ddToE(dd) {
    if (dd[0] === 0) {
        return [
            dd[1]
        ];
    }
    return dd; // a double-double already is a valid expansion
}


;// ./src/double-expansion/is-overlapping.ts



/**
 * Returns true if a and b overlaps, false otherwise.
 * 
 * Two floating-point values x and y are nonoverlapping if the least significant 
 * nonzero bit of x is more significant than the most significant nonzero bit of
 * y.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * Implemented for testing purposes.
 * @param a a double
 * @param b another double
 */ function isOverlapping(a, b) {
    return !isNonOverlapping(a, b);
}
/**
 * Returns true if a and b does not overlap, false otherwise.
 * 
 * Two floating-point values x and y are nonoverlapping if the least significant 
 * nonzero bit of x is more significant than the most significant nonzero bit of
 * y.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * Implemented for testing purposes.
 * 
 * @param a A double
 * @param b Another double
 */ function isNonOverlapping(a, b) {
    if (a === 0 || b === 0) {
        return true;
    }
    if (Math.abs(b) > Math.abs(a)) {
        [a, b] = [
            b,
            a
        ];
    }
    // At this point abs(a) > abs(b)
    const l = getLowestSetBit(a);
    const h = getHighestSetBit(b);
    const shift = exponent(a) - exponent(b);
    return l + shift > h;
}
/**
 * Returns true if all components of the given floating point expansion is 
 * non-overlapping, false otherwise.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a double floating point expansion
 */ function isNonOverlappingAll(e) {
    for(let i = 1; i < e.length; i++){
        if (isOverlapping(e[i - 1], e[i])) {
            return false;
        }
    }
    return true;
}


;// ./src/double-expansion/is-adjacent.ts

/**
 * Returns true if x and y are adjacent, false otherwise.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * for details
 * 
 * @param x a double floating point number
 * @param y another double floating point number
 */ function isAdjacent(x, y) {
    return isOverlapping(x, y) || isOverlapping(x, 2 * y) || isOverlapping(2 * x, y);
}


;// ./src/double-expansion/e-is-integer.ts
/**
 * Returns `true` if the given floating point expansion represents an integer,
 * `false` otherwise.
 *
 * * no compression is required: since the components are nonoverlapping, the
 * lowest set bit of the sum is the lowest set bit of the smallest nonzero
 * component, so the sum is an integer iff every component is
 *
 * @param a a floating point expansion
 */ function eIsInteger(a) {
    for(let i = 0; i < a.length; i++){
        if (a[i] % 1 !== 0) {
            return false;
        }
    }
    return true;
}


;// ./src/infinite-precision/dyadic-float.ts
/**
 * Arbitrary-precision dyadic floating-point number — core representation.
 *
 * A value is represented as:
 *
 *      x = (-1)^sign * mantissa * 2^exp
 *
 * where:
 *  - sign     : 0 for non-negative, 1 for negative.
 *  - mantissa : a non-negative arbitrary-precision integer stored as an
 *               array of base-2^LIMB_BITS "limbs", little-endian
 *               (mantissa[0] is least significant). Each limb is an integer
 *               in [0, 2^LIMB_BITS) held inside a double.
 *  - exp      : an integer power-of-two scale, completely decoupled from the
 *               mantissa. This is what removes the overflow/underflow defect
 *               of a Shewchuk expansion: the exponent is no longer pinned to
 *               the double range.
 *
 * Because the values are dyadic (denominator is always a power of two),
 * addition, subtraction and multiplication are EXACT and closed in this
 * representation. Only division requires rounding.
 *
 * Limbs use radix 2^26 so that the product of any two limbs is < 2^52 and is
 * therefore exactly representable in a double — schoolbook multiplication and
 * carry propagation can be done entirely in floating point.
 */ /** Number of value bits per limb. 26 keeps limb*limb < 2^52 (exact in a double). */ const LIMB_BITS = 26;
/** Radix of a single limb: 2^LIMB_BITS. */ const LIMB_BASE = 2 ** LIMB_BITS;


;// ./src/infinite-precision/helpers/normalize.ts

/**
 * Reduce a DyadicFloat to canonical form, in place:
 *  - propagate any carries so every limb is in [0, LIMB_BASE),
 *  - drop high-order zero limbs,
 *  - factor out trailing zero limbs and bits into `exp` so the mantissa is
 *    odd,
 *  - collapse to canonical zero when the mantissa is empty.
 *
 * The result is unique per value, so (normalized) values can be compared
 * structurally (see `dfEquals`).
 *
 * * **destructive**: Returns the same object for convenience (thus only call
 * it on a freshly created value, never on e.g. `DF_ZERO`).
 */ function dfNormalize(x) {
    const m = x.mantissa;
    // 1. Carry-propagate so each limb is a clean integer in range.
    let carry = 0;
    for(let i = 0; i < m.length; i++){
        const v = m[i] + carry;
        const low = v % LIMB_BASE;
        m[i] = low;
        carry = (v - low) / LIMB_BASE;
    }
    while(carry > 0){
        const low = carry % LIMB_BASE;
        m.push(low);
        carry = (carry - low) / LIMB_BASE;
    }
    // 2. Trim leading (most-significant) zero limbs.
    while(m.length > 0 && m[m.length - 1] === 0){
        m.pop();
    }
    // 3. Canonical zero.
    if (m.length === 0) {
        x.sign = 0;
        x.exp = 0;
        return x;
    }
    // 4. Factor trailing zero limbs into the exponent.
    let lowZeroLimbs = 0;
    while(lowZeroLimbs < m.length && m[lowZeroLimbs] === 0){
        lowZeroLimbs++;
    }
    if (lowZeroLimbs > 0) {
        m.splice(0, lowZeroLimbs);
        x.exp += lowZeroLimbs * (/* inlined export .LIMB_BITS */26);
    }
    // 5. Factor trailing zero bits of m[0] into the exponent so the mantissa
    //    is odd. This makes the representation unique: two normalized values
    //    are equal iff their sign, exp and limbs are equal.
    const tz = 31 - Math.clz32(m[0] & -m[0]); // m[0] !== 0 here
    if (tz > 0) {
        const mask = (1 << tz) - 1;
        const up = (/* inlined export .LIMB_BITS */26) - tz;
        const last = m.length - 1;
        for(let i = 0; i < last; i++){
            // all limbs are < 2^26 so these 32-bit operations are exact
            m[i] = m[i] >>> tz | (m[i + 1] & mask) << up;
        }
        m[last] >>>= tz;
        if (m[last] === 0) {
            m.pop();
        } // at most one limb can empty out
        x.exp += tz;
    }
    return x;
}


;// ./src/infinite-precision/zero.ts
/**
 * The canonical zero: `{ sign: 0, mantissa: [], exp: 0 }`.
 * 
 * * frozen (also its mantissa) since it is shared by all functions returning 
 * zero
 */ const DF_ZERO = Object.freeze({
    sign: 0,
    mantissa: Object.freeze([]),
    exp: 0
});


;// ./src/infinite-precision/from-double.ts



const _scratch = new DataView(new ArrayBuffer(8));
/**
 * Build a DyadicFloat from a JS double. Exact for all finite doubles
 * (including subnormals and ±0). Throws on NaN / ±Infinity.
 */ function dfFromDouble(v) {
    if (v === 0) return DF_ZERO; // covers +0 and -0
    _scratch.setFloat64(0, v);
    const hi = _scratch.getUint32(0);
    const lo = _scratch.getUint32(4);
    const sign = hi >>> 31;
    const expField = hi >>> 20 & 0x7ff;
    const fracHigh = hi & 0xfffff; // low 20 bits of the high word
    if (expField === 0x7ff) {
        throw new Error('dfFromDouble: value must be finite');
    }
    // 52-bit fraction as an exact integer (fracHigh < 2^20, lo < 2^32).
    const frac = fracHigh * 2 ** 32 + lo;
    // value = (-1)^sign * mantissaInt * 2^e2
    let mantissaInt;
    let e2;
    if (expField === 0) {
        // Subnormal: no hidden bit, biased exponent treated as 1.
        mantissaInt = frac;
        e2 = -1074;
    } else {
        // Normal: add the hidden leading 1 bit.
        mantissaInt = frac + 2 ** 52;
        e2 = expField - 1075; // (expField - 1023) - 52
    }
    // Split the (<= 53-bit) significand into base-2^26 limbs; normalize fixes
    // the high limb (which may be >= LIMB_BASE) via carry propagation.
    const low = mantissaInt % LIMB_BASE;
    const high = Math.floor(mantissaInt / LIMB_BASE);
    return dfNormalize({
        sign,
        mantissa: [
            low,
            high
        ],
        exp: e2
    });
}


;// ./src/infinite-precision/is-zero.ts
/**
 * Returns `true` if `x` represents the `DyadicFloat` value zero,
 * `false` otherwise.
 */ function dfIsZero(x) {
    return x.mantissa.length === 0;
}


;// ./src/infinite-precision/shift-left.ts

/**
 * Shift a mantissa up by `bits` bits (multiply by 2^bits), returning a new
 * limb array. Used to align two operands to a common exponent.
 */ function dfShiftLeft(m, bits) {
    if (bits === 0 || m.length === 0) return m.slice();
    const limbShift = Math.floor(bits / (/* inlined export .LIMB_BITS */26));
    const bitShift = bits % (/* inlined export .LIMB_BITS */26);
    const out = new Array(limbShift).fill(0);
    if (bitShift === 0) {
        for(let i = 0; i < m.length; i++)out.push(m[i]);
        return out;
    }
    let carry = 0;
    for(let i = 0; i < m.length; i++){
        const v = m[i] * 2 ** bitShift + carry;
        out.push(v % LIMB_BASE);
        carry = Math.floor(v / LIMB_BASE);
    }
    while(carry > 0){
        out.push(carry % LIMB_BASE);
        carry = Math.floor(carry / LIMB_BASE);
    }
    return out;
}


;// ./src/infinite-precision/align.ts

/**
 * Align two values to a common (lower) exponent so their mantissas can be
 * added/subtracted limb-by-limb. Returns the two shifted mantissas and the
 * shared exponent. Does not mutate inputs.
 */ function dfAlign(a, b) {
    const exp = Math.min(a.exp, b.exp);
    const ma = dfShiftLeft(a.mantissa, a.exp - exp);
    const mb = dfShiftLeft(b.mantissa, b.exp - exp);
    return {
        ma,
        mb,
        exp
    };
}


;// ./src/infinite-precision/add-magnitude.ts

/**
 * Add two aligned magnitude limb arrays:
 * * returns a + b (not normalized).
 * * * Exact
 */ function dfAddMagnitude(a, b) {
    const n = Math.max(a.length, b.length);
    const out = [];
    let carry = 0;
    for(let i = 0; i < n; i++){
        const v = (a[i] ?? 0) + (b[i] ?? 0) + carry;
        const low = v % LIMB_BASE;
        out.push(low);
        carry = (v - low) / LIMB_BASE;
    }
    if (carry > 0) out.push(carry);
    return out;
}


;// ./src/infinite-precision/sub-magnitude.ts

/**
 * Subtract aligned magnitudes: returns a - b, ASSUMING a >= b.
 * Result is not normalized (may carry leading zeros).
 */ function dfSubMagnitude(a, b) {
    const out = new Array(a.length);
    let borrow = 0;
    for(let i = 0; i < a.length; i++){
        let v = a[i] - (b[i] ?? 0) - borrow;
        if (v < 0) {
            v += LIMB_BASE;
            borrow = 1;
        } else {
            borrow = 0;
        }
        out[i] = v;
    }
    // borrow should be 0 here when a >= b.
    return out;
}


;// ./src/infinite-precision/compare-magnitude-aligned.ts
/**
 * Compare two aligned magnitude limb arrays (same exponent assumed).
 * Returns -1, 0 or 1 for a<b, a==b, a>b respectively.
 */ function dfCompareMagnitudeAligned(a, b) {
    if (a.length !== b.length) {
        return a.length < b.length ? -1 : 1;
    }
    for(let i = a.length - 1; i >= 0; i--){
        if (a[i] !== b[i]) {
            return a[i] < b[i] ? -1 : 1;
        }
    }
    return 0;
}


;// ./src/infinite-precision/add.ts







/**
 * Adds two dyadic floats: a + b.
 * * Exact
 * * Both operands are first aligned to the smaller exponent so the cost (time
 * and memory) is proportional to the difference in exponents, e.g. adding
 * `2^(10^9)` and `1` allocates a mantissa of about 38 million limbs.
 */ function dfAdd(a, b) {
    if (dfIsZero(a)) {
        return {
            sign: b.sign,
            mantissa: b.mantissa.slice(),
            exp: b.exp
        };
    }
    if (dfIsZero(b)) {
        return {
            sign: a.sign,
            mantissa: a.mantissa.slice(),
            exp: a.exp
        };
    }
    const { ma, mb, exp } = dfAlign(a, b);
    let result;
    if (a.sign === b.sign) {
        // Same sign: magnitudes add, sign preserved.
        result = {
            sign: a.sign,
            mantissa: dfAddMagnitude(ma, mb),
            exp
        };
    } else {
        // Opposite signs: subtract smaller magnitude from larger.
        const cmp = dfCompareMagnitudeAligned(ma, mb);
        if (cmp === 0) {
            return DF_ZERO; // equal magnitudes cancel to zero
        }
        result = cmp > 0 ? {
            sign: a.sign,
            mantissa: dfSubMagnitude(ma, mb),
            exp
        } : {
            sign: b.sign,
            mantissa: dfSubMagnitude(mb, ma),
            exp
        };
    }
    return dfNormalize(result);
}


;// ./src/double-expansion/e-to-dyadic-float.ts



/**
 * Convert a Shewchuk floating-point expansion to a DyadicFloat.
 *
 * The expansion's exact value is the sum of its components; this conversion is
 * exact since every finite double is an exact dyadic number and dyadic
 * addition is closed and exact.
 *
 * The components need not be nonoverlapping or sorted — any array of finite
 * doubles is accepted and its exact sum is returned.
 *
 * @param e a floating point expansion
 */ function eToDyadicFloat(e) {
    let acc = DF_ZERO;
    for(let i = 0; i < e.length; i++){
        acc = dfAdd(acc, dfFromDouble(e[i]));
    }
    return acc;
}


;// ./src/infinite-precision/limb-bit-length.ts
/** Number of significant bits in a single limb (limb is in [0, 2^26)). */ function dfLimbBitLength(v) {
    return v === 0 ? 0 : 32 - Math.clz32(v);
}


;// ./src/infinite-precision/mantissa-bit-length.ts


/**
 * Number of significant bits of the integer represented by `m`
 * (position of the most-significant set bit, plus one). Zero for an empty
 * mantissa. Assumes `m` is normalized (top limb non-zero).
 */ function dfMantissaBitLength(m) {
    if (m.length === 0) return 0;
    return (m.length - 1) * (/* inlined export .LIMB_BITS */26) + dfLimbBitLength(m[m.length - 1]);
}


;// ./src/infinite-precision/compare.ts




/**
 * Returns the sign of `x`, i.e. `-1`, `0` or `1`.
 */ function dfSign(x) {
    return dfIsZero(x) ? 0 : x.sign === 1 ? -1 : 1;
}
/**
 * Returns `-1`, `0` or `1` if `a < b`, `a === b` or `a > b` respectively.
 *
 * * **precondition:** `a` and `b` must be normalized (as returned by all
 * functions in this library, or see `dfNormalize`)
 */ function dfCompare(a, b) {
    const sa = dfSign(a);
    const sb = dfSign(b);
    if (sa !== sb) {
        return sa < sb ? -1 : 1;
    }
    if (sa === 0) {
        return 0;
    } // both zero
    // Same nonzero sign: compare magnitudes, first by the position of the
    // most significant bit (cheap), then limb by limb after aligning.
    const topA = a.exp + dfMantissaBitLength(a.mantissa);
    const topB = b.exp + dfMantissaBitLength(b.mantissa);
    let cmp;
    if (topA !== topB) {
        cmp = topA < topB ? -1 : 1;
    } else {
        const { ma, mb } = dfAlign(a, b);
        cmp = dfCompareMagnitudeAligned(ma, mb);
    }
    return cmp === 0 ? 0 : sa * cmp; // (avoid returning -0)
}


;// ./src/infinite-precision/equals.ts
/**
 * Returns `true` if `a` and `b` represent the same value, `false` otherwise.
 *
 * * **precondition:** `a` and `b` must be normalized (as returned by all
 * functions in this library, or see `dfNormalize`) - the normalized
 * representation is unique so a structural comparison suffices
 */ function dfEquals(a, b) {
    if (a.sign !== b.sign || a.exp !== b.exp) {
        return false;
    }
    const ma = a.mantissa;
    const mb = b.mantissa;
    if (ma.length !== mb.length) {
        return false;
    }
    for(let i = 0; i < ma.length; i++){
        if (ma[i] !== mb[i]) {
            return false;
        }
    }
    return true;
}


;// ./src/infinite-precision/get-bit.ts

/** Return bit `i` (0 = least significant) of the integer represented by `m`. */ function dfGetBit(m, i) {
    const limb = Math.floor(i / (/* inlined export .LIMB_BITS */26));
    if (limb < 0 || limb >= m.length) return 0;
    return m[limb] >> i % (/* inlined export .LIMB_BITS */26) & 1;
}


;// ./src/infinite-precision/low-bits-set.ts

/** True iff any of the low `k` bits (positions 0..k-1) of `m` are set. */ function dfLowBitsSet(m, k) {
    if (k <= 0) return false;
    const fullLimbs = Math.floor(k / (/* inlined export .LIMB_BITS */26));
    for(let i = 0; i < fullLimbs && i < m.length; i++){
        if (m[i] !== 0) return true;
    }
    const rem = k % (/* inlined export .LIMB_BITS */26);
    if (rem > 0 && fullLimbs < m.length) {
        const mask = (1 << rem) - 1;
        if ((m[fullLimbs] & mask) !== 0) return true;
    }
    return false;
}


;// ./src/infinite-precision/mul.ts




/**
 * Multiply: a * b. Exact.
 *
 * Schoolbook O(n*m) multiply. Each partial product a[i]*b[j] < 2^52 so it is
 * exact in a double; carries are propagated as we go and finished off by
 * `normalize`.
 *
 * TODO: consider a Karatsuba threshold for large operands.
 */ function dfMul(a, b) {
    if (dfIsZero(a) || dfIsZero(b)) {
        return DF_ZERO;
    }
    const ma = a.mantissa;
    const mb = b.mantissa;
    // accumulate in a (zero-initialized, unboxed) typed array
    const out = new Float64Array(ma.length + mb.length);
    for(let i = 0; i < ma.length; i++){
        const ai = ma[i];
        if (ai === 0) continue;
        let carry = 0;
        for(let j = 0; j < mb.length; j++){
            const v = out[i + j] + ai * mb[j] + carry;
            const low = v % LIMB_BASE;
            out[i + j] = low;
            carry = (v - low) / LIMB_BASE;
        }
        out[i + mb.length] += carry;
    }
    return dfNormalize({
        sign: a.sign ^ b.sign,
        mantissa: Array.from(out),
        exp: a.exp + b.exp
    });
}


;// ./src/infinite-precision/neg.ts


/**
 * Returns the negative of the given `DyadicFloat`.
 */ function dfNeg(x) {
    if (dfIsZero(x)) {
        return DF_ZERO;
    }
    return {
        sign: x.sign ^ 1,
        mantissa: x.mantissa.slice(),
        exp: x.exp
    };
}


;// ./src/infinite-precision/shift-right.ts

/**
 * Shift a mantissa down by `bits` bits (floor-divide by 2^bits), returning a
 * new limb array. The discarded low bits are lost — used to truncate a
 * mantissa toward zero. The result is not guaranteed normalized.
 */ function dfShiftRight(m, bits) {
    if (bits === 0 || m.length === 0) return m.slice();
    const limbShift = Math.floor(bits / (/* inlined export .LIMB_BITS */26));
    if (limbShift >= m.length) return [];
    const bitShift = bits % (/* inlined export .LIMB_BITS */26);
    if (bitShift === 0) {
        return m.slice(limbShift);
    }
    const inv = (/* inlined export .LIMB_BITS */26) - bitShift;
    const lowMask = (1 << bitShift) - 1;
    const out = new Array(m.length - limbShift);
    for(let i = limbShift; i < m.length; i++){
        const low = m[i] >> bitShift;
        const high = i + 1 < m.length ? (m[i + 1] & lowMask) * 2 ** inv : 0;
        out[i - limbShift] = (low + high) % LIMB_BASE;
    }
    return out;
}


;// ./src/infinite-precision/round.ts







/**
 * Limit a DyadicFloat to at most `prec` significant mantissa bits using
 * round-to-nearest, ties-to-even.
 *
 * Unlike `truncate` (which always rounds toward zero), this keeps the closest
 * representable value with `prec` significant bits, breaking exact halfway
 * cases toward the even mantissa. The error is therefore at most half an ulp
 * of the retained precision.
 *
 * Values already within `prec` bits are returned unchanged (copied).
 *
 * @param x a `DyadicFloat`
 * @param prec maximum number of significant mantissa bits (must be positive)
 */ function dfRound(x, prec) {
    if (dfIsZero(x)) {
        return DF_ZERO;
    }
    const m = x.mantissa;
    const bitlen = dfMantissaBitLength(m);
    if (bitlen <= prec) {
        return {
            sign: x.sign,
            mantissa: m.slice(),
            exp: x.exp
        };
    }
    const shift = bitlen - prec;
    const kept = dfShiftRight(m, shift);
    // Round-to-nearest, ties-to-even on the discarded low `shift` bits.
    const roundBit = dfGetBit(m, shift - 1);
    const sticky = dfLowBitsSet(m, shift - 1);
    const keptIsOdd = dfGetBit(m, shift) === 1;
    if (roundBit === 1 && (sticky || keptIsOdd)) {
        kept[0] = (kept[0] ?? 0) + 1; // normalize propagates the carry
    }
    // Note: rounding up can carry out of the top bit (e.g. 0b111 -> 0b1000),
    // but the mantissa is then a power of 2 which `dfNormalize` reduces to 1
    // (factoring its zero bits into `exp`) so at most `prec` bits remain.
    return dfNormalize({
        sign: x.sign,
        mantissa: kept,
        exp: x.exp + shift
    });
}


;// ./src/infinite-precision/sub.ts


/**
 * Subtract: a - b.
 * * exact
 */ function dfSub(a, b) {
    return dfAdd(a, dfNeg(b));
}


;// ./src/infinite-precision/helpers/ldexp.ts
/**
 * Compute `x * 2^e` as a double, stepping the exponent so intermediate
 * multipliers stay finite. Handles overflow to ±Infinity and gradual
 * underflow / subnormals correctly.
 */ function ldexp(x, e) {
    if (x === 0) {
        return 0;
    }
    while(e > 1023){
        x *= 2 ** 1023;
        e -= 1023;
        if (!isFinite(x)) {
            return x;
        }
    }
    while(e < -1074){
        x *= 2 ** -1074;
        e += 1074;
        if (x === 0) {
            return 0;
        }
    }
    return x * 2 ** e;
}

;// ./src/infinite-precision/helpers/extract-bits.ts

/**
 * Returns bits `lo` up to (but excluding) `lo + count` of the (normalized)
 * integer represented by the limb array `m` as an exact integer, i.e.
 * `floor(M / 2^lo) mod 2^count`.
 *
 * * **precondition:** `lo >= 0` and `count <= 53` (so the result is exact)
 *
 * Works a limb (rather than a bit) at a time.
 */ function dfExtractBits(m, lo, count) {
    let result = 0;
    let got = 0; // number of bits extracted so far
    let i = Math.floor(lo / (/* inlined export .LIMB_BITS */26));
    let offset = lo % (/* inlined export .LIMB_BITS */26);
    while(got < count && i < m.length){
        const take = Math.min((/* inlined export .LIMB_BITS */26) - offset, count - got);
        const bits = m[i] >>> offset & (1 << take) - 1;
        result += bits * 2 ** got;
        got += take;
        offset = 0;
        i++;
    }
    return result;
}


;// ./src/infinite-precision/to-double.ts






/**
 * Convert to the nearest JS double using round-to-nearest, ties-to-even.
 * Overflows to ±Infinity and underflows to ±0 as IEEE-754 dictates.
 * Assumes `x` is normalized.
 */ function dfToDouble(x) {
    if (dfIsZero(x)) {
        return 0;
    }
    const m = x.mantissa;
    const bitlen = dfMantissaBitLength(m);
    // Number of low bits to discard so the kept significand fits in 53 bits
    // and, for subnormal results, so that its lsb is not below 2^-1074. Doing
    // the subnormal reduction here (rather than letting `ldexp` round again)
    // avoids double rounding.
    const shift = Math.max(0, bitlen - 53, -1074 - x.exp);
    // Build q = floor(M / 2^shift) (at most 53 bits => exact in a double).
    let q = dfExtractBits(m, shift, bitlen - shift);
    let e2 = x.exp + shift;
    if (shift > 0) {
        // Round-to-nearest, ties-to-even on the discarded low `shift` bits.
        const roundBit = dfGetBit(m, shift - 1);
        const sticky = dfLowBitsSet(m, shift - 1);
        if (roundBit === 1 && (sticky || q % 2 === 1)) {
            q += 1;
            if (q === 2 ** 53) {
                // Mantissa carried out of 53 bits; renormalize.
                q /= 2;
                e2 += 1;
            }
        }
    }
    const magnitude = ldexp(q, e2);
    return x.sign === 1 ? -magnitude : magnitude;
}


;// ./src/infinite-precision/to-expansion.ts





/** Bits packed into each expansion component (a double holds 53). */ const CHUNK_BITS = 53;
/**
 * Convert a DyadicFloat to a Shewchuk floating-point expansion.
 *
 * The returned array is a compressed (nonoverlapping and nonadjacent)
 * expansion, sorted in order of increasing magnitude, whose exact sum equals
 * the value of `x`. The conversion is exact as long as every component is
 * within the double range, i.e. it is subject to overflow (to ±Infinity) and
 * underflow (loss of low bits).
 *
 * The integer significand is sliced into successive 53-bit windows; each
 * nonzero window becomes one component scaled by the appropriate power of two.
 * Because the windows occupy disjoint bit ranges, the components are
 * nonoverlapping by construction. Adjacent windows may however produce
 * adjacent components (which `fastExpansionSum` does not allow), so the
 * result is compressed.
 *
 * A zero value yields `[0]`.
 *
 * @param x a normalized DyadicFloat
 */ function dfToExpansion(x) {
    if (dfIsZero(x)) {
        return [
            0
        ];
    }
    const m = x.mantissa;
    const bitlen = dfMantissaBitLength(m);
    const negative = x.sign === 1;
    const e = [];
    for(let start = 0; start < bitlen; start += CHUNK_BITS){
        const count = Math.min(CHUNK_BITS, bitlen - start);
        // Build this window's bits as an exact integer in [0, 2^53).
        const q = dfExtractBits(m, start, count);
        if (q === 0) {
            continue;
        } // skip empty windows
        const component = ldexp(q, x.exp + start);
        e.push(negative ? -component : component);
    }
    // The significand was nonzero, but every window could round to a zero
    // double on underflow; keep the contract of returning a valid expansion.
    if (e.length === 0) {
        return [
            0
        ];
    }
    return eCompress(e);
}


;// ./src/infinite-precision/truncate.ts





/**
 * Limit a DyadicFloat to at most `prec` significant mantissa bits by
 * truncating toward zero.
 *
 * The low bits of the mantissa are discarded and the same count is folded into
 * `exp`, so the value stays (-1)^sign * mantissa' * 2^exp' with mantissa'
 * holding at most `prec` significant bits. Because only low bits are dropped,
 * the magnitude never increases: the result is the closest representable value
 * to `x` whose magnitude does not exceed |x| (round toward zero).
 *
 * Values already within `prec` bits are returned unchanged (copied).
 *
 * @param x a `DyadicFloat`
 * @param prec maximum number of significant mantissa bits (must be positive)
 */ function dfTruncate(x, prec) {
    if (dfIsZero(x)) {
        return DF_ZERO;
    }
    const bitlen = dfMantissaBitLength(x.mantissa);
    if (bitlen <= prec) {
        return {
            sign: x.sign,
            mantissa: x.mantissa.slice(),
            exp: x.exp
        };
    }
    const shift = bitlen - prec;
    return dfNormalize({
        sign: x.sign,
        mantissa: dfShiftRight(x.mantissa, shift),
        exp: x.exp + shift
    });
}


;// ./src/index.ts
//----------------------
// Geometric primitives
//----------------------

//---------------------------------
// Double precision core functions
//---------------------------------










//-----------------------
// Double representation
//-----------------------












//---------------------
// Shewchuk expansions
//---------------------

























// Aliases for some functions which names were not changed due to them being
// used extensively in the literature with a particular recognizable name






























export { DF_ZERO, bitLength, ddToDouble, ddToE, dfAdd, dfAddMagnitude, dfAlign, dfCompare, dfCompareMagnitudeAligned, dfEquals, dfFromDouble, dfGetBit, dfIsZero, dfLimbBitLength, dfLowBitsSet, dfMantissaBitLength, dfMul, dfNeg, dfNormalize, dfRound, dfShiftLeft, dfShiftRight, dfSign, dfSub, dfSubMagnitude, dfToDouble, dfToExpansion, dfTruncate, doubleToBinaryString, doubleToDd, doubleToOctets, eAbs, fastExpansionSum as eAdd, growExpansion as eAddDouble, eCalculate, eCompare, eCompress, eDiff, eDiv, eDivBy2, eEstimate, eIntDiv, eIntPow, eIsInteger, eLongDivide, merge as eMerge, expansionProduct as eMult, eMultBy2, eMultByNeg2, scaleExpansion as eMultDouble1, scaleExpansion2 as eMultDouble2, eNegativeOf, eProduct, eRem, eSign, eSum, eToBitlength, eToDd, eToDyadicFloat, expBitLength, expansionProduct, exponent, fastExpansionSum, fastTwoDiff, fastTwoSum, getHighestSetBit, getLowestSetBit, growExpansion, isAdjacent, isBitAligned, isNonOverlapping, isNonOverlappingAll, isOverlapping, lsbExponent, msbExponent, orient2d, parseDouble, parseDoubleDetailed, reduceSignificand, scaleExpansion, scaleExpansion2, significand, split, twoDiff, twoProduct, twoSquare, twoSum };
