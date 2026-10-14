import { describe, expect, it } from '@jest/globals';
import { eIntPow } from '../../src/double-expansion/e-int-pow.js';
import { eProduct } from '../../src/double-expansion/e-product.js';
import { eCompare } from '../../src/double-expansion/e-compare.js';


describe('eIntPow', function() {
    it('should correctly return the integer power of a floating point expansion without any error', 
    function() {
        {
            let a = [2];

            expect(eIntPow(a,0)).toEqual([1]);
            expect(eIntPow(a,1)).toEqual([2]);
            expect(eIntPow(a,2)).toEqual([4]);
            expect(eIntPow(a,8)).toEqual([256]);
        }
    });

    it('should match repeated multiplication for odd/even powers and multi-component expansions', 
    function() {
        expect(eIntPow([3],5)).toEqual([243]);
        expect(eIntPow([-3],7)).toEqual([-2187]);

        const a = [2**-60, 1 + 2**-30];  // 1 + 2^-30 + 2^-60
        for (let p=2; p<=13; p++) {
            const expected = eProduct(new Array(p).fill(a));
            expect(eCompare(eIntPow(a,p), expected)).toBe(0);
        }
    });
});