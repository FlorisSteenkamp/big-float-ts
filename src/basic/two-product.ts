import { SPLIT_FACTOR as f } from './split-factor.js';


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
 */
function twoProduct(a: number, b: number): number[] { 
    const x = a*b;

    // inlined: [ah, al] = split(a)
    const c = f * a; const ah = c - (c - a); const al = a - ah;
    // inlined: [bh, bl] = split(b)
    const d = f * b; const bh = d - (d - b); const bl = b - bh;

    const y = (al*bl) - ((x - (ah*bh)) - (al*bh) - (ah*bl));

    return [y,x];
}


export { twoProduct }
