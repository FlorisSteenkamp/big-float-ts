import { describe, expect, it } from '@jest/globals';
import { dfAlign } from '../../src/infinite-precision/align.js';
import type { DyadicFloat } from '../../src/infinite-precision/dyadic-float.js';


describe('dfAlign', function() {
    it('should leave equal-exponent operands unchanged',
    function() {
        const a: DyadicFloat = { sign: 0, mantissa: [3], exp: 0 };
        const b: DyadicFloat = { sign: 0, mantissa: [5], exp: 0 };
        const { ma, mb, exp } = dfAlign(a, b);
        expect(exp).toBe(0);
        expect(ma).toEqual([3]);
        expect(mb).toEqual([5]);
    });

    it('should bring both operands to the lower exponent',
    function() {
        const a: DyadicFloat = { sign: 0, mantissa: [1], exp: 60 }; // value 2^60
        const b: DyadicFloat = { sign: 0, mantissa: [1], exp: 0 };  // value 1
        const { ma, mb, exp } = dfAlign(a, b);
        expect(exp).toBe(0);
        // 2^60 = 256 * (2^26)^2 => limb 2 holds 256
        expect(ma).toEqual([0, 0, 256]);
        expect(mb).toEqual([1]);
    });

    it('should not mutate its inputs',
    function() {
        const a: DyadicFloat = { sign: 0, mantissa: [7], exp: 40 };
        const b: DyadicFloat = { sign: 0, mantissa: [9], exp: -3 };
        const aBefore = JSON.parse(JSON.stringify(a));
        const bBefore = JSON.parse(JSON.stringify(b));
        dfAlign(a, b);
        expect(a).toEqual(aBefore);
        expect(b).toEqual(bBefore);
    });
});
