/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ao: () => (/* reexport */ bitLength),
  dC: () => (/* reexport */ doubleToBinaryString),
  T7: () => (/* reexport */ doubleToOctets),
  us: () => (/* reexport */ eAbs),
  DI: () => (/* reexport */ fastExpansionSum),
  mL: () => (/* reexport */ growExpansion),
  MH: () => (/* reexport */ eCalculate),
  pD: () => (/* reexport */ eCompare),
  KW: () => (/* reexport */ e_compress_eCompress),
  h1: () => (/* reexport */ eDiff),
  pR: () => (/* reexport */ eDiv),
  C0: () => (/* reexport */ eDivBy2),
  QS: () => (/* reexport */ eEstimate),
  qg: () => (/* reexport */ eIntDiv),
  B4: () => (/* reexport */ eIntPow),
  a5: () => (/* reexport */ eIsInteger),
  xF: () => (/* reexport */ eLongDivide),
  yl: () => (/* reexport */ expansionProduct),
  bQ: () => (/* reexport */ eMultBy2),
  L8: () => (/* reexport */ eMultByNeg2),
  qJ: () => (/* reexport */ scaleExpansion),
  xl: () => (/* reexport */ scaleExpansion2),
  qb: () => (/* reexport */ eNegativeOf),
  Ff: () => (/* reexport */ eProduct),
  Q$: () => (/* reexport */ eRem),
  Bu: () => (/* reexport */ eSign),
  ze: () => (/* reexport */ eSum),
  EN: () => (/* reexport */ eToBitlength),
  Tv: () => (/* reexport */ eToDd),
  df: () => (/* reexport */ expBitLength),
  Lf: () => (/* reexport */ expansionProduct),
  g6: () => (/* reexport */ exponent),
  n6: () => (/* reexport */ fastExpansionSum),
  gD: () => (/* reexport */ fastTwoDiff),
  uJ: () => (/* reexport */ fast_two_sum_fastTwoSum),
  QK: () => (/* reexport */ getHighestSetBit),
  aX: () => (/* reexport */ getLowestSetBit),
  jy: () => (/* reexport */ growExpansion),
  RJ: () => (/* reexport */ isAdjacent),
  O2: () => (/* reexport */ isBitAligned),
  q7: () => (/* reexport */ isNonOverlappingAll),
  pE: () => (/* reexport */ lsbExponent),
  Ei: () => (/* reexport */ msbExponent),
  c_: () => (/* reexport */ orient2d),
  bt: () => (/* reexport */ parseDouble),
  $n: () => (/* reexport */ parseDoubleDetailed),
  K1: () => (/* reexport */ reduceSignificand),
  K9: () => (/* reexport */ scaleExpansion),
  ct: () => (/* reexport */ scaleExpansion2),
  uI: () => (/* reexport */ significand),
  lD: () => (/* reexport */ split),
  QC: () => (/* reexport */ twoDiff),
  gB: () => (/* reexport */ two_product_twoProduct),
  S4: () => (/* reexport */ two_sum_twoSum)
});

;// CONCATENATED MODULE: ./src/double-expansion/e-sign.ts
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
 */
function eSign(e) {
    return e[e.length - 1];
}


;// CONCATENATED MODULE: ./src/double-representation/double-to-octets.ts
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)
/**
 * Returns the ieee-574 8 bytes composing the given double, starting from the
 * sign bit and ending in the lsb of the significand.
 * e.g. 123.456 -> [64, 94, 221, 47, 26, 159, 190, 119]
 */
function doubleToOctets(number) {
    const buffer = new ArrayBuffer(8);
    new DataView(buffer).setFloat64(0, number, false);
    return Array.from(new Uint8Array(buffer));
}


;// CONCATENATED MODULE: ./src/double-representation/double-to-binary-string.ts
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)

function doubleToBinaryString(number) {
    return octetsToBinaryString(doubleToOctets(number));
}
/**
 * @param octets The 8 bytes composing a double (msb first)
 */
function octetsToBinaryString(octets) {
    return octets
        .map(int8ToBinaryString)
        .join('');
}
/**
 * intToBinaryString(8) -> "00001000"
 */
function int8ToBinaryString(i) {
    let iStr = i.toString(2);
    for (; iStr.length < 8; iStr = "0" + iStr)
        ;
    return iStr;
}


;// CONCATENATED MODULE: ./src/double-representation/parse-double.ts
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)


/**
 * Returns the relevant parts of the given IEEE-754 double. The returned
 * exponent has been normalized (i.e. 1023 ha been subtracted) and the
 * significand has the hidden bit added if appropriate.
 * See https://github.com/bartaz/ieee754-visualization
 */
function parseDouble(x) {
    const parts = doubleToOctets(x);
    const p0 = parts[0];
    const p1 = parts[1];
    const sign = p0 >> 7;
    const exponent_ = ((p0 & 127) << 4) + ((p1 & 0b11110000) >> 4);
    //---- Check for negative / positive zero / denormalized numbers.
    const hiddenMsb = exponent_ === 0 ? 0 : 16;
    // Note: exponent === 0 => 0 or denormalized number (a.k.a. subnormal number).
    const exponent = exponent_ === 0
        ? exponent_ - 1022 // Subnormals use a biased exponent of 1 (not 0!)
        : exponent_ - 1023;
    //---- Break up the significand into bytes
    const significand = parts.slice(1);
    significand[0] = (p1 & 15) + hiddenMsb;
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
 */
function parseDoubleDetailed(x) {
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


;// CONCATENATED MODULE: ./src/double-representation/significand.ts

/**
 * Return the significand of the given double with the hidden bit added (in case
 * a is not subnormal or 0, etc.)
 * @param a A double
 */
function significand(a) {
    return parseDouble(a).significand;
}


;// CONCATENATED MODULE: ./src/double-representation/get-max-set-bit.ts

/**
 * Returns the lowest set bit of the given value in [1, (2**31)-1],
 * i.e. from 1 up to 2147483647 else if no bit is set (input === 0) returns
 * NaN, otherwise if the number is out of range returns a non-finite
 * number.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getLowestSetBit_(a) {
    return Math.log2(a & -a);
}
/**
 * Returns the lowest set bit of the given number's significand (where the lsb
 * is bit 0 and the msb is bit 52). If no bit is set (input === 0 or +-inf or
 * NaN) returns NaN.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getLowestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no lowest set bit
        return NaN;
    }
    // Note: the significand includes the hidden bit!
    const s = significand(a);
    const len = s.length;
    for (let i = len - 1; i >= 0; i--) {
        if (s[i] === 0) {
            continue;
        }
        const l = getLowestSetBit_(s[i]);
        if (Number.isFinite(l)) {
            return (8 * (len - i - 1)) + l;
        }
    }
    return NaN;
}
/**
 * Returns the highest set bit of the given value in [1, 255], i.e. from 1 up
 * to 255. If the input number === 0 returns NaN.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getHighestSetBit_(a) {
    return a >= 128 ? 7
        : a >= 64 ? 6
            : a >= 32 ? 5
                : a >= 16 ? 4
                    : a >= 8 ? 3
                        : a >= 4 ? 2
                            : a >= 2 ? 1
                                : a >= 1 ? 0
                                    : NaN;
}
/**
 * Returns the highest set bit of the given double. If no bit is set (input
 * === 0 or +/-inf or NaN) returns NaN.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getHighestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no lowest set bit
        return NaN;
    }
    // At this point there must be a highest set bit (always === 52 if the 
    // number is not a subnormal.
    const s = significand(a);
    const len = s.length;
    for (let i = 0; i < len; i++) {
        const l = getHighestSetBit_(s[i]);
        if (Number.isFinite(l)) {
            return (8 * (len - i - 1)) + l;
        }
    }
    return NaN;
}


;// CONCATENATED MODULE: ./src/double-representation/exponent.ts

/**
 * Returns the normalized exponent of the given number.
 * @param a A double
 */
function exponent(a) {
    return parseDouble(a).exponent;
}


;// CONCATENATED MODULE: ./src/double-representation/msb-exponent.ts


/**
 * Returns the true exponent of the msb that is set of the given number or
 * NaN if a === 0 or +-inf or NaN.
 * @param a An array of numbers to check
 */
function msbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
        return NaN;
    }
    const e = exponent(a);
    // Will return e for all but subnormal numbers
    return getHighestSetBit(a) - 52 + e;
}


;// CONCATENATED MODULE: ./src/double-expansion/e-compress.ts
/**
 * Returns the result of compressing the given floating point expansion.
 *
 * * primarily for internal library use
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 23 (Shewchuck): Let e = sum_(i=1)^m(e_i) be a nonoverlapping
 * expansion of m p-bit components, where m >= 3. Suppose that the components of
 * e are sorted in order of increasing magnitude, except that any of the e_i may
 * be zero. Then the following algorithm will produce a nonoverlapping expansion
 * (nonadjacent if round-to even tiebreaking is used) such that
 * h = sum_(i=1)^n(h_i) = e, where the components h_i are in order of increasing
 * magnitude. If h != 0, none of the h_i will be zero. Furthermore, the largest
 * component h_n approximates h with an error smaller than ulp(h_n).
 */
function e_compress_eCompress(e) {
    //return e;
    const e_ = e.slice();
    const m = e_.length;
    if (m === 1) {
        return e_;
    }
    let Q = e_[m - 1];
    let bottom = m;
    for (let i = m - 2; i >= 0; --i) {
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
    for (let i = bottom; i < m; ++i) {
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


;// CONCATENATED MODULE: ./src/basic/reduce-significand.ts
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
 * @param a a double
 * @param bits the number of significand bits to leave intact
 */
function reduceSignificand(a, bits) {
    const s = 53 - bits;
    const f = 2 ** s + 1;
    const c = f * a;
    const r = c - (c - a);
    return r;
}


;// CONCATENATED MODULE: ./src/double-expansion/e-to-bitlength.ts




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const sign = eSign;
const compress = e_compress_eCompress;
/**
 * Returns a floating point expansion accurate to the given number of bits.
 * Extraneous bits are discarded.
 * @param a a floating point expansion
 * @param l the number of accurate bits to keep
 */
// TODO - make faster
function eToBitlength(a, l) {
    a = compress(a);
    if (sign(a) === 0) {
        return [0];
    }
    const maxMsb = msbExponent(a[a.length - 1]);
    let msb = maxMsb;
    let i = a.length - 1; // start at most significant byte
    while (i > 0) {
        const msb_ = msbExponent(a[i - 1]);
        if (maxMsb - msb_ > l) {
            break;
        }
        msb = msb_;
        i--;
    }
    const keepBits = Math.min(l - (maxMsb - msb), 53);
    let b = a[i];
    b = reduceSignificand(b, keepBits);
    const result = a.slice(i);
    result[0] = b;
    return result;
}


;// CONCATENATED MODULE: ./src/double-expansion/e-estimate.ts
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
 */
function eEstimate(e) {
    let Q = e[0];
    for (let i = 1; i < e.length; i++) {
        Q += e[i];
    }
    return Q;
}


;// CONCATENATED MODULE: ./src/double-expansion/fast-expansion-sum.ts
// import { eCompress } from "./e-compress.js";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
// const compress = eCompress;
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
 */
function fastExpansionSum(e, f) {
    //const g = merge(e,f);
    // inlined (above line)
    const lenE = e.length;
    const lenF = f.length;
    let i = 0;
    let j = 0;
    const g = [];
    while (i < lenE && j < lenF) {
        if (e[i] === 0) {
            i++;
            continue;
        }
        if (f[j] === 0) {
            j++;
            continue;
        }
        if (Math.abs(e[i]) <= Math.abs(f[j])) {
            g.push(e[i]);
            i++;
        }
        else {
            g.push(f[j]);
            j++;
        }
    }
    while (i < lenE) {
        g.push(e[i]);
        i++;
    }
    while (j < lenF) {
        g.push(f[j]);
        j++;
    }
    if (g.length === 0) {
        return [0];
    }
    // end inlined
    const len = g.length;
    if (len === 1) {
        return g;
    }
    //const h: number[] = new Array(len);
    const h = [];
    //const q: number;
    //[h[0], q] = fastTwoSum(g[1], g[0]);
    // inlined (above line)
    const a = g[1];
    const b = g[0];
    let q = a + b;
    //h[0] = b - (q - a);
    const hh = b - (q - a);
    if (hh !== 0) {
        h.push(hh);
    }
    //let j = 0;
    j = 0;
    for (let i = 2; i < len; i++) {
        //[h[i-1], q] = twoSum(q, g[i]);
        // inlined (above line)
        const b = g[i];
        const R = q + b;
        const _ = R - q;
        //h[i-1] = (q - (R - _)) + (b - _);
        const hh = (q - (R - _)) + (b - _);
        if (hh !== 0) {
            h.push(hh);
        }
        q = R;
    }
    //h[len-1] = q;
    //h.push(q);
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return compress(h);
    return h;
}
/**
 * Returns the result of merging an expansion e and f into a single expansion,
 * in order of nondecreasing magnitude (possibly with interspersed zeros).
 * (This function is zero-eliminating)
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 * @param f another floating point expansion
 */
function merge(e, f) {
    const lenE = e.length;
    const lenF = f.length;
    let i = 0;
    let j = 0;
    const merged = [];
    while (i < lenE && j < lenF) {
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
        }
        else {
            merged.push(f[j]);
            j++;
        }
    }
    while (i < lenE) {
        merged.push(e[i]);
        i++;
    }
    while (j < lenF) {
        merged.push(f[j]);
        j++;
    }
    if (merged.length === 0) {
        return [0];
    }
    return merged;
}


;// CONCATENATED MODULE: ./src/double-expansion/scale-expansion.ts




const f = 134217729; // 2**27 + 1;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const tp = (/* unused pure expression or super */ null && (twoProduct));
const ts = (/* unused pure expression or super */ null && (twoSum));
const fts = (/* unused pure expression or super */ null && (fastTwoSum));
const scale_expansion_compress = (/* unused pure expression or super */ null && (eCompress));
/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 19 (Shwechuk): Let e = sum_(i=1)^m(e_i) be a nonoverlapping expansion
 * of m p-bit components, and const b be a p-bit value where p >= 4. Suppose that
 * the components of e are sorted in order of increasing magnitude, except that
 * any of the e_i may be zero. Then the following algorithm will produce a
 * nonoverlapping expansion h such that h = sum_(i=1)^(2m)(h_i) = be, where the
 * components of h are also in order of increasing magnitude, except that any of
 * the h_i may be zero. Furthermore, if e is nonadjacent and round-to-even
 * tiebreaking is used, then h is non-adjacent.
 *
 * @param e a double floating point expansion
 * @param b a double
 */
function scaleExpansion(e, b) {
    const m = e.length;
    //const h: number[] = new Array(2*m);
    let q_;
    //[h[0], q] = tp(e[0], b);
    // inlined (above line)
    const a = e[0];
    let q = a * b;
    const c = f * a;
    const ah = c - (c - a);
    const al = a - ah;
    const d = f * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const h = [];
    //h[0] = (al*bl) - ((q - (ah*bh)) - (al*bh) - (ah*bl));
    const hh = (al * bl) - ((q - (ah * bh)) - (al * bh) - (ah * bl));
    if (hh !== 0) {
        h.push(hh);
    }
    for (let i = 1; i < m; i++) {
        //const [t, T] = tp(e[i], b);
        // inlined (above line)
        const a = e[i];
        const T = a * b;
        const c = f * a;
        const ah = c - (c - a);
        const al = a - ah;
        const d = f * b;
        const bh = d - (d - b);
        const bl = b - bh;
        const t = (al * bl) - ((T - (ah * bh)) - (al * bh) - (ah * bl));
        //[h[2*i-1], q_] = ts(q, t);
        // inlined (above line)
        const x = q + t;
        const bv = x - q;
        //h[2*i-1] = (q - (x - bv)) + (t - bv);
        //h.push((q - (x - bv)) + (t - bv));
        const hh = (q - (x - bv)) + (t - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        q_ = x;
        //[h[2*i], q] = fts(T, q_);
        // inlined (above line)
        const xx = T + q_;
        //h[2*i] = q_ - (xx - T);
        //h.push(q_ - (xx - T));
        const hhh = q_ - (xx - T);
        if (hhh !== 0) {
            h.push(hhh);
        }
        q = xx;
    }
    //h[2*m - 1] = q;
    //h.push(q);
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return eCompress(h);
    return h;
}
/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 19 (Shwechuk): Let e = sum_(i=1)^m(e_i) be a nonoverlapping expansion
 * of m p-bit components, and const b be a p-bit value where p >= 4. Suppose that
 * the components of e are sorted in order of increasing magnitude, except that
 * any of the e_i may be zero. Then the following algorithm will produce a
 * nonoverlapping expansion h such that h = sum_(i=1)^(2m)(h_i) = be, where the
 * components of h are also in order of increasing magnitude, except that any of
 * the h_i may be zero. Furthermore, if e is nonadjacent and round-to-even
 * tiebreaking is used, then h is non-adjacent.
 *
 * @param e a double floating point expansion
 * @param b a double
 */
function scaleExpansion2(b, e) {
    const m = e.length;
    //const h: number[] = new Array(2*m);
    let q_;
    //[h[0], q] = tp(e[0], b);
    // inlined (above line)
    const a = e[0];
    let q = a * b;
    const c = f * a;
    const ah = c - (c - a);
    const al = a - ah;
    const d = f * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const h = [];
    //h[0] = (al*bl) - ((q - (ah*bh)) - (al*bh) - (ah*bl));
    const hh = (al * bl) - ((q - (ah * bh)) - (al * bh) - (ah * bl));
    if (hh !== 0) {
        h.push(hh);
    }
    for (let i = 1; i < m; i++) {
        //const [t, T] = tp(e[i], b);
        // inlined (above line)
        const a = e[i];
        const T = a * b;
        const c = f * a;
        const ah = c - (c - a);
        const al = a - ah;
        const d = f * b;
        const bh = d - (d - b);
        const bl = b - bh;
        const t = (al * bl) - ((T - (ah * bh)) - (al * bh) - (ah * bl));
        //[h[2*i-1], q_] = ts(q, t);
        // inlined (above line)
        const x = q + t;
        const bv = x - q;
        //h[2*i-1] = (q - (x - bv)) + (t - bv);
        //h.push((q - (x - bv)) + (t - bv));
        const hh = (q - (x - bv)) + (t - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        q_ = x;
        //[h[2*i], q] = fts(T, q_);
        // inlined (above line)
        const xx = T + q_;
        //h[2*i] = q_ - (xx - T);
        //h.push(q_ - (xx - T));
        const hhh = q_ - (xx - T);
        if (hhh !== 0) {
            h.push(hhh);
        }
        q = xx;
    }
    //h[2*m - 1] = q;
    //h.push(q);
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return eCompress(h);
    return h;
}


;// CONCATENATED MODULE: ./src/double-expansion/expansion-product.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const multByDouble = scaleExpansion;
const add = fastExpansionSum;
const expansion_product_compress = (/* unused pure expression or super */ null && (eCompress));
/**
 * Returns the product of two double floating point expansions.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * As per Shewchuk in the above paper: "To find the product of two expansions
 * e and f, use SCALE-EXPANSION (with zero elimination) to form the expansions
 * ef_1, ef_2, ..., then sum these using a distillation tree."
 *
 * A distillation tree used with fastExpansionSum will give O(k*log k) vs O(k^2)
 * operations.
 *
 * Implemented naively and not as described by Shewchuk (i.e. the algorithm
 * takes O(k^2) operations).
 * @param e a double floating point expansion
 * @param f another double floating point expansion
 */
function expansionProduct(e, f) {
    let sum = [0];
    for (let i = 0; i < e.length; i++) {
        sum = add(sum, multByDouble(f, e[i]));
    }
    //return compress(sum);
    return sum;
}


;// CONCATENATED MODULE: ./src/double-expansion/e-negative-of.ts
/**
 * Returns the negative of the given floating point expansion.
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eNegativeOf(e) {
    const m = e.length;
    const h = new Array(m);
    for (let i = 0; i < m; i++) {
        h[i] = -e[i];
    }
    return h;
}


;// CONCATENATED MODULE: ./src/double-expansion/e-diff.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const negativeOf = eNegativeOf;
const e_diff_add = fastExpansionSum;
/**
 * Returns the difference between two floating point expansions, i.e. e - f.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 * @param f another floating point expansion
 */
function eDiff(e, f) {
    const g = negativeOf(f);
    return e_diff_add(e, g);
}


;// CONCATENATED MODULE: ./src/double-representation/bit-length.ts




/**
 * Returns the bit-length of the significand of the given number in such a way
 * that trailing zeros are not counted.
 * @param a A double precision floating point number
 */
function bitLength(a) {
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
 */
function expBitLength(a) {
    const a_ = e_compress_eCompress(a);
    if (eSign(a_) === 0) {
        return 0;
    }
    const msbyte = a_[a_.length - 1];
    const lsbyte = a_[0];
    return exponent(msbyte) - exponent(lsbyte) + (53 - getLowestSetBit(lsbyte));
}


;// CONCATENATED MODULE: ./src/double-expansion/e-div.ts





// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = expansionProduct;
const toBitlength = eToBitlength;
const e_div_bitLength = expBitLength;
const diff = eDiff;
const estimate = eEstimate;
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
 */
// TODO - test this function properly or replace with a better one
function eDiv(N, D, expansionLength) {
    let D_ = D;
    let N_ = N;
    let exact = false;
    let resultBitlengthUpperBound = 0;
    if (!expansionLength) {
        const bitlengthN = e_div_bitLength(N_);
        const bitlengthD = e_div_bitLength(D_);
        // resultBitlengthUpperBound is only valid if the division is known
        // to be exact
        resultBitlengthUpperBound = bitlengthN - bitlengthD + 1;
        expansionLength = (resultBitlengthUpperBound / 53) + 1;
        exact = true;
    }
    let F = [1 / estimate(D_)]; // Initial guess - out by 1/2 upls
    let i = 1;
    while (true) {
        N_ = mult(N_, F);
        // The precision bitlength doubles on each iteration
        if (i > expansionLength) {
            // we now have roughly double the needed precision - we actually 
            // only require about the precision and then round properly - this
            // could be implemented in the future.
            if (exact) {
                // We must throw away bits known to be zero. 
                // Any bits > expansionLength * 53 must be thrown away as they
                // are wrong - all other bits are exact.
                N_ = toBitlength(N_, resultBitlengthUpperBound);
                // TODO - below is just for testing - remove later
                //if (compare(mult(D, N_), N) !== 0) {
                //    console.log(mult(D, N_))
                //    throw new Error(`division in-exact - probably due to underflow, N: ${N}, D: ${D}, Result: ${N_}, product: ${mult(D, N_)}`); 
                //} 
                return N_;
            }
            // Returning only significant bits helps with sign determination later on.
            return N_.slice(N_.length - expansionLength, N_.length);
        }
        D_ = mult(D_, F);
        F = diff([2], D_);
        i *= 2;
    }
}


;// CONCATENATED MODULE: ./src/double-expansion/grow-expansion.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const grow_expansion_compress = (/* unused pure expression or super */ null && (eCompress));
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
 * @param e A floating point expansion
 * @param b Another floating point expansion
 */
function growExpansion(e, b) {
    const m = e.length;
    let q = b;
    //const h: number[] = new Array(m+1);
    const h = [];
    //let j = 0;
    for (let i = 0; i < m; i++) {
        // Note the use of twoSum and not fastTwoSum.
        //[h[i], q] = ts(q, e[i]);
        const ee = e[i];
        const x = q + ee;
        const bv = x - q;
        const hh = (q - (x - bv)) + (ee - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        q = x;
    }
    //h[j] = q;
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return compress(h);
    return h;
}


;// CONCATENATED MODULE: ./src/basic/two-sum.ts
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
 */
function two_sum_twoSum(a, b) {
    const x = a + b;
    const bv = x - a;
    return [(a - (x - bv)) + (b - bv), x];
}
// inlined
//const R = a + b; const _ = R - a; const r = (a - (R - _)) + (b - _); return [r,R]


;// CONCATENATED MODULE: ./src/double-expansion/e-sum.ts



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_sum_ts = two_sum_twoSum;
const addDouble = growExpansion;
const e_sum_add = fastExpansionSum;
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
 */
// The terms parameter were chosen to always be expansions in order to keep the 
// function monomorhic, but whether it's really worth it I am not sure.
function eSum(terms) {
    let total = [0];
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        // add
        if (term.length === 1) {
            if (total.length === 1) {
                total = e_sum_ts(total[0], term[0]);
            }
            else {
                total = addDouble(total, term[0]);
            }
        }
        else {
            if (total.length === 1) {
                total = addDouble(term, total[0]);
            }
            else {
                total = e_sum_add(total, term);
            }
        }
    }
    return total;
}


;// CONCATENATED MODULE: ./src/double-expansion/e-long-divide.ts







// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_long_divide_eNegativeOf = eNegativeOf;
const e_long_divide_fastExpansionSum = fastExpansionSum;
const e_long_divide_eCompress = e_compress_eCompress;
const e_long_divide_growExpansion = growExpansion;
const e_long_divide_eSum = eSum;
const e_long_divide_scaleExpansion = scaleExpansion;
const e_long_divide_eDiff = eDiff;
const e_long_divide_sign = Math.sign;
function eLongDivide(N, D) {
    N = e_long_divide_eCompress(N);
    D = e_long_divide_eCompress(D);
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
            return { div: e_long_divide_eNegativeOf(N), rem: [0] };
        }
    }
    const signN = e_long_divide_sign(N[N.length - 1]);
    if (signN === 0) {
        return { div: [0], rem: [0] };
    }
    const signD = e_long_divide_sign(d);
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
            rems.push(e_long_divide_scaleExpansion(D, div)); // exact
            if (div === 0) {
                break;
            }
            divs.push(div);
        }
        N = e_long_divide_eCompress(e_long_divide_eDiff(N, e_long_divide_eSum(rems)));
        if (oldLen === divs.length) {
            break;
        }
        oldLen = divs.length;
    }
    let rem = N;
    let div = [0];
    for (let i = 0; i < divs.length; i++) {
        div = e_long_divide_growExpansion(div, divs[i]);
    }
    div = e_long_divide_eCompress(div);
    //----------------------
    // fix signs (possibly)
    //----------------------
    //const signDiv = sign(div[div.length-1]);
    const signRem = e_long_divide_sign(rem[rem.length - 1]);
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
                div = e_long_divide_growExpansion(div, -1);
                rem = e_long_divide_fastExpansionSum(rem, D);
            }
            else {
                // div = div + 1  (div is positive)
                // rem = rem - D
                div = e_long_divide_growExpansion(div, +1);
                rem = e_long_divide_fastExpansionSum(rem, e_long_divide_eNegativeOf(D));
            }
        }
        else if (signN < 0) {
            if (signD > 0) {
                // div = div + 1 (div is negative)
                // rem = rem - D
                div = e_long_divide_growExpansion(div, +1);
                rem = e_long_divide_fastExpansionSum(rem, e_long_divide_eNegativeOf(D));
            }
            else {
                // div = div - 1  (div is positive)
                // rem = rem + D
                div = e_long_divide_growExpansion(div, -1);
                rem = e_long_divide_fastExpansionSum(rem, D);
            }
        }
    }
    return { div, rem };
}


;// CONCATENATED MODULE: ./src/double-expansion/e-int-div.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_int_div_eLongDivide = eLongDivide;
/**
 * Returns the result of the integer division a/b.
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
function eIntDiv(a, b) {
    return e_int_div_eLongDivide(a, b).div;
}


;// CONCATENATED MODULE: ./src/double-expansion/e-rem.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_rem_eLongDivide = eLongDivide;
/**
 * Returns a % b
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
function eRem(a, b) {
    return e_rem_eLongDivide(a, b).rem;
}


;// CONCATENATED MODULE: ./src/double-expansion/e-compare.ts


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
 */
function eCompare(a, b) {
    return eSign(eDiff(a, b));
}


;// CONCATENATED MODULE: ./src/double-expansion/e-abs.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_abs_negativeOf = eNegativeOf;
/**
 * Returns the absolute value of the given floating point expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eAbs(e) {
    if (e[e.length - 1] < 0) {
        return e_abs_negativeOf(e);
    }
    return e;
}


;// CONCATENATED MODULE: ./src/basic/fast-two-diff.ts
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
 */
function fastTwoDiff(a, b) {
    const x = a - b;
    const y = (a - x) - b;
    return [y, x];
}


;// CONCATENATED MODULE: ./src/basic/fast-two-sum.ts
/**
 * Returns the sum and exact error of adding two floating point numbers.
 * Uses an EFT (error-free transformation), i.e. a+b === x+y exactly.
 * The returned sum is a non-overlapping expansion (smallest value first!).
 *
 * Precondition: abs(a) >= abs(b) - A fast test that can be used is
 * (a > b) === (a > -b)
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function fast_two_sum_fastTwoSum(a, b) {
    const x = a + b;
    return [b - (x - a), x];
}
// inlined
//const R = a + b; const r = b - (R - a); return [r, R];


;// CONCATENATED MODULE: ./src/double-expansion/e-mult-by-2.ts
/**
 * Returns the result of multiplying a floating point expansion by 2.
 * * **error free**
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eMultBy2(e) {
    const e_ = [];
    for (let i = 0; i < e.length; i++) {
        e_.push(2 * e[i]);
    }
    return e_;
}


;// CONCATENATED MODULE: ./src/double-expansion/e-mult-by-neg-2.ts
/**
 * Multiply a floating point expansion by -2.
 * * **error free**
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eMultByNeg2(e) {
    const e_ = [];
    for (let i = 0; i < e.length; i++) {
        e_.push(-2 * e[i]);
    }
    return e_;
}


;// CONCATENATED MODULE: ./src/double-expansion/e-div-by-2.ts
/**
 * Returns the result of dividing a floating point expansion by 2.
 * * **error free**
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eDivBy2(e) {
    const e_ = [];
    for (let i = 0; i < e.length; i++) {
        e_.push(0.5 * e[i]);
    }
    return e_;
}


;// CONCATENATED MODULE: ./src/basic/split.ts
/**
 * === Math.ceil(p/2) where p is the # of significand bits in a double === 53.
 */
const split_f = 134217729; // 2**27 + 1;
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
 * @param a A double floating point number
 */
function split(a) {
    const c = split_f * a;
    const a_h = c - (c - a);
    const a_l = a - a_h;
    return [a_h, a_l];
}
// inlined - input a, output a_h, a_l
// const c = f * a; const a_h = c - (c - a); const a_l = a - a_h; return [a_h, a_l];


;// CONCATENATED MODULE: ./src/basic/two-diff.ts
/**
 * Returns the exact result of subtracting b from a (as a floating point
 * expansion).
 * @param a
 * @param b
 */
function twoDiff(a, b) {
    const x = a - b;
    const bvirt = a - x;
    const y = (a - (x + bvirt)) + (bvirt - b);
    return [y, x];
}


;// CONCATENATED MODULE: ./src/basic/two-product.ts
const two_product_f = 134217729; // 2**27 + 1;
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
 * @param a A double
 * @param b Another double
 */
function two_product_twoProduct(a, b) {
    const x = a * b;
    //const [ah, al] = split(a);
    const c = two_product_f * a;
    const ah = c - (c - a);
    const al = a - ah;
    //const [bh, bl] = split(b);
    const d = two_product_f * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const y = (al * bl) - ((x - (ah * bh)) - (al * bh) - (ah * bl));
    //const err1 = x - (ah * bh);
    //const err2 = err1 - (al * bh);
    //const err3 = err2 - (ah * bl);
    //const y = (al * bl) - err3;
    return [y, x];
}


;// CONCATENATED MODULE: ./src/double-representation/is-bit-aligned.ts


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
 * @param as An array of numbers to check
 * @param maxBitLength The max allowed bitlength
 * @param gridSpacingExponent The grid spacing === 1^gridSpacingExponent
 */
function isBitAligned(a, maxBitLength, gridSpacingExponent) {
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


;// CONCATENATED MODULE: ./src/double-representation/lsb-exponent.ts


/**
 * Returns the true exponent of the lsb that is set of the given number or
 * NaN if a === 0 or +-inf or NaN.
 * @param a An array of numbers to check
 */
function lsbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
        return NaN;
    }
    const e = exponent(a);
    return getLowestSetBit(a) - 52 + e;
}


;// CONCATENATED MODULE: ./src/double-expansion/e-calculate.ts







// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_calculate_mult = expansionProduct;
const e_calculate_tp = two_product_twoProduct;
const e_calculate_multByDouble = scaleExpansion;
const e_calculate_ts = two_sum_twoSum;
const e_calculate_addDouble = growExpansion;
const e_calculate_add = fastExpansionSum;
const e_calculate_compress = (/* unused pure expression or super */ null && (eCompress));
/**
 * Return the result of summing an array of terms, each term being an array of
 * floating point expansions to be multiplied together.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param terms An array of terms to be summed; A term consists of an
 * array of floating point expansions to be multiplied together.
 */
// The terms parameter were chosen to always be expansions in order to keep the 
// function monomorhic, but whether it's really worth it I am not sure.
function eCalculate(terms) {
    let total = [0];
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        let product = term[0];
        for (let j = 1; j < term.length; j++) {
            const multiplicant = term[j];
            if (multiplicant.length == 1) {
                if (product.length === 1) {
                    product = e_calculate_tp(product[0], multiplicant[0]);
                }
                else {
                    product = e_calculate_multByDouble(product, multiplicant[0]);
                }
            }
            else if (product.length === 1) {
                product = e_calculate_multByDouble(multiplicant, product[0]);
            }
            else {
                product = e_calculate_mult(multiplicant, product);
            }
        }
        // add
        if (product.length === 1) {
            if (total.length === 1) {
                total = e_calculate_ts(total[0], product[0]);
            }
            else {
                total = e_calculate_addDouble(total, product[0]);
            }
        }
        else {
            if (total.length === 1) {
                total = e_calculate_addDouble(product, total[0]);
            }
            else {
                total = e_calculate_add(total, product);
            }
        }
    }
    //return compress(total);
    return total;
}


;// CONCATENATED MODULE: ./src/double-expansion/e-product.ts




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_product_mult = expansionProduct;
const e_product_tp = two_product_twoProduct;
const e_product_multByDouble = scaleExpansion;
const e_product_compress = e_compress_eCompress;
/**
 * Return the result of multiplying together an array of floating point
 * expansions.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param terms an array of multiplicands
 */
function eProduct(term) {
    let product = term[0];
    for (let j = 1; j < term.length; j++) {
        const multiplicant = term[j];
        if (multiplicant.length == 1) {
            if (product.length === 1) {
                product = e_product_tp(product[0], multiplicant[0]);
            }
            else {
                product = e_product_multByDouble(product, multiplicant[0]);
            }
        }
        else if (product.length === 1) {
            product = e_product_multByDouble(multiplicant, product[0]);
        }
        else {
            product = e_product_mult(multiplicant, product);
        }
    }
    return e_product_compress(product);
    //return product;
}


;// CONCATENATED MODULE: ./src/double-expansion/e-int-pow.ts


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_int_pow_mult = expansionProduct;
const prod = eProduct;
/**
 * Returns a**i, where i is a non-negative integer.
 * @param a a floating point expansion
 */
// TODO - this algorithm's speed can easily be improved significantly using 'repeated squaring'
function eIntPow(a, p) {
    // a^0 === 1
    if (p === 0) {
        return [1];
    }
    // a^1 === a
    if (p === 1) {
        return a;
    }
    if (p === 2) {
        return e_int_pow_mult(a, a);
    }
    const as = [];
    for (let i = 0; i < p; i++) {
        as.push(a);
    }
    return prod(as);
}


;// CONCATENATED MODULE: ./src/double-expansion/e-to-double-double.ts

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_to_double_double_compress = e_compress_eCompress;
/**
 * Returns the result of converting a floating point expansion to a
 * double-double precision floating point number.
 */
function eToDd(e) {
    e = e_to_double_double_compress(e);
    const len = e.length;
    if (len === 2) {
        return e; // already a double-double
    }
    else if (len === 1) {
        return [0, e[0]]; // double-doubles have a fixed length of 2
    }
    return [e[len - 2], e[len - 1]]; // return only most significant parts
}


;// CONCATENATED MODULE: ./src/geometric-primitives/orient2d.ts






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
    const b = eDiff(two_product_twoProduct(acx, bcy), two_product_twoProduct(acy, bcx));
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
    const a = eDiff(two_product_twoProduct(acxtail, bcy), two_product_twoProduct(acytail, bcx));
    const c = fastExpansionSum(b, a);
    const d = eDiff(two_product_twoProduct(acx, bcytail), two_product_twoProduct(acy, bcxtail));
    const e = fastExpansionSum(c, d);
    const f = eDiff(two_product_twoProduct(acxtail, bcytail), two_product_twoProduct(acytail, bcxtail));
    let D = fastExpansionSum(e, f);
    D = e_compress_eCompress(D);
    return D[D.length - 1];
}


;// CONCATENATED MODULE: ./src/double-expansion/is-overlapping.ts


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
 */
function isOverlapping(a, b) {
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
 */
function isNonOverlapping(a, b) {
    if (a === 0 || b === 0) {
        return true;
    }
    if (Math.abs(b) > Math.abs(a)) {
        [a, b] = [b, a];
    }
    // At this point abs(a) > abs(b)
    const l = getLowestSetBit(a);
    const h = getHighestSetBit(b);
    const shift = exponent(a) - exponent(b);
    return (l + shift) > h;
}
/**
 * Returns true if all components of the given floating point expansion is
 * non-overlapping, false otherwise.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a double floating point expansion
 */
function isNonOverlappingAll(e) {
    for (let i = 1; i < e.length; i++) {
        if (isOverlapping(e[i - 1], e[i])) {
            return false;
        }
    }
    return true;
}


;// CONCATENATED MODULE: ./src/double-expansion/is-adjacent.ts

/**
 * Returns true if x and y are adjacent, false otherwise.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * for details
 *
 * @param x a double floating point number
 * @param y another double floating point number
 */
function isAdjacent(x, y) {
    return isOverlapping(x, y) ||
        isOverlapping(x, 2 * y) ||
        isOverlapping(2 * x, y);
}


;// CONCATENATED MODULE: ./src/double-expansion/e-is-integer.ts

function eIsInteger(a) {
    a = e_compress_eCompress(a);
    for (let i = 0; i < a.length; i++) {
        if (a[i] % 1 !== 0) {
            return false;
        }
    }
    return true;
}


;// CONCATENATED MODULE: ./src/index.ts










































// Aliases for some functions which names were not changed due to them being
// used extensively in the literature with a particular recognizable name





var __webpack_exports__bitLength = __webpack_exports__.ao;
var __webpack_exports__doubleToBinaryString = __webpack_exports__.dC;
var __webpack_exports__doubleToOctets = __webpack_exports__.T7;
var __webpack_exports__eAbs = __webpack_exports__.us;
var __webpack_exports__eAdd = __webpack_exports__.DI;
var __webpack_exports__eAddDouble = __webpack_exports__.mL;
var __webpack_exports__eCalculate = __webpack_exports__.MH;
var __webpack_exports__eCompare = __webpack_exports__.pD;
var __webpack_exports__eCompress = __webpack_exports__.KW;
var __webpack_exports__eDiff = __webpack_exports__.h1;
var __webpack_exports__eDiv = __webpack_exports__.pR;
var __webpack_exports__eDivBy2 = __webpack_exports__.C0;
var __webpack_exports__eEstimate = __webpack_exports__.QS;
var __webpack_exports__eIntDiv = __webpack_exports__.qg;
var __webpack_exports__eIntPow = __webpack_exports__.B4;
var __webpack_exports__eIsInteger = __webpack_exports__.a5;
var __webpack_exports__eLongDivide = __webpack_exports__.xF;
var __webpack_exports__eMult = __webpack_exports__.yl;
var __webpack_exports__eMultBy2 = __webpack_exports__.bQ;
var __webpack_exports__eMultByNeg2 = __webpack_exports__.L8;
var __webpack_exports__eMultDouble1 = __webpack_exports__.qJ;
var __webpack_exports__eMultDouble2 = __webpack_exports__.xl;
var __webpack_exports__eNegativeOf = __webpack_exports__.qb;
var __webpack_exports__eProduct = __webpack_exports__.Ff;
var __webpack_exports__eRem = __webpack_exports__.Q$;
var __webpack_exports__eSign = __webpack_exports__.Bu;
var __webpack_exports__eSum = __webpack_exports__.ze;
var __webpack_exports__eToBitlength = __webpack_exports__.EN;
var __webpack_exports__eToDd = __webpack_exports__.Tv;
var __webpack_exports__expBitLength = __webpack_exports__.df;
var __webpack_exports__expansionProduct = __webpack_exports__.Lf;
var __webpack_exports__exponent = __webpack_exports__.g6;
var __webpack_exports__fastExpansionSum = __webpack_exports__.n6;
var __webpack_exports__fastTwoDiff = __webpack_exports__.gD;
var __webpack_exports__fastTwoSum = __webpack_exports__.uJ;
var __webpack_exports__getHighestSetBit = __webpack_exports__.QK;
var __webpack_exports__getLowestSetBit = __webpack_exports__.aX;
var __webpack_exports__growExpansion = __webpack_exports__.jy;
var __webpack_exports__isAdjacent = __webpack_exports__.RJ;
var __webpack_exports__isBitAligned = __webpack_exports__.O2;
var __webpack_exports__isNonOverlappingAll = __webpack_exports__.q7;
var __webpack_exports__lsbExponent = __webpack_exports__.pE;
var __webpack_exports__msbExponent = __webpack_exports__.Ei;
var __webpack_exports__orient2d = __webpack_exports__.c_;
var __webpack_exports__parseDouble = __webpack_exports__.bt;
var __webpack_exports__parseDoubleDetailed = __webpack_exports__.$n;
var __webpack_exports__reduceSignificand = __webpack_exports__.K1;
var __webpack_exports__scaleExpansion = __webpack_exports__.K9;
var __webpack_exports__scaleExpansion2 = __webpack_exports__.ct;
var __webpack_exports__significand = __webpack_exports__.uI;
var __webpack_exports__split = __webpack_exports__.lD;
var __webpack_exports__twoDiff = __webpack_exports__.QC;
var __webpack_exports__twoProduct = __webpack_exports__.gB;
var __webpack_exports__twoSum = __webpack_exports__.S4;
export { __webpack_exports__bitLength as bitLength, __webpack_exports__doubleToBinaryString as doubleToBinaryString, __webpack_exports__doubleToOctets as doubleToOctets, __webpack_exports__eAbs as eAbs, __webpack_exports__eAdd as eAdd, __webpack_exports__eAddDouble as eAddDouble, __webpack_exports__eCalculate as eCalculate, __webpack_exports__eCompare as eCompare, __webpack_exports__eCompress as eCompress, __webpack_exports__eDiff as eDiff, __webpack_exports__eDiv as eDiv, __webpack_exports__eDivBy2 as eDivBy2, __webpack_exports__eEstimate as eEstimate, __webpack_exports__eIntDiv as eIntDiv, __webpack_exports__eIntPow as eIntPow, __webpack_exports__eIsInteger as eIsInteger, __webpack_exports__eLongDivide as eLongDivide, __webpack_exports__eMult as eMult, __webpack_exports__eMultBy2 as eMultBy2, __webpack_exports__eMultByNeg2 as eMultByNeg2, __webpack_exports__eMultDouble1 as eMultDouble1, __webpack_exports__eMultDouble2 as eMultDouble2, __webpack_exports__eNegativeOf as eNegativeOf, __webpack_exports__eProduct as eProduct, __webpack_exports__eRem as eRem, __webpack_exports__eSign as eSign, __webpack_exports__eSum as eSum, __webpack_exports__eToBitlength as eToBitlength, __webpack_exports__eToDd as eToDd, __webpack_exports__expBitLength as expBitLength, __webpack_exports__expansionProduct as expansionProduct, __webpack_exports__exponent as exponent, __webpack_exports__fastExpansionSum as fastExpansionSum, __webpack_exports__fastTwoDiff as fastTwoDiff, __webpack_exports__fastTwoSum as fastTwoSum, __webpack_exports__getHighestSetBit as getHighestSetBit, __webpack_exports__getLowestSetBit as getLowestSetBit, __webpack_exports__growExpansion as growExpansion, __webpack_exports__isAdjacent as isAdjacent, __webpack_exports__isBitAligned as isBitAligned, __webpack_exports__isNonOverlappingAll as isNonOverlappingAll, __webpack_exports__lsbExponent as lsbExponent, __webpack_exports__msbExponent as msbExponent, __webpack_exports__orient2d as orient2d, __webpack_exports__parseDouble as parseDouble, __webpack_exports__parseDoubleDetailed as parseDoubleDetailed, __webpack_exports__reduceSignificand as reduceSignificand, __webpack_exports__scaleExpansion as scaleExpansion, __webpack_exports__scaleExpansion2 as scaleExpansion2, __webpack_exports__significand as significand, __webpack_exports__split as split, __webpack_exports__twoDiff as twoDiff, __webpack_exports__twoProduct as twoProduct, __webpack_exports__twoSum as twoSum };
