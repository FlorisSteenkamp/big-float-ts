import { describe, expect, it } from '@jest/globals';
import { dfShiftRight } from '../../src/infinite-precision/shift-right.js';


describe('dfShiftRight', function() {
    it('should return a copy for a zero shift',
    function() {
        const m = [1, 2];
        const out = dfShiftRight(m, 0);
        expect(out).toEqual([1, 2]);
        expect(out).not.toBe(m);
    });

    it('should floor-divide within a limb (dropping low bits)',
    function() {
        expect(dfShiftRight([2], 1)).toEqual([1]);
        expect(dfShiftRight([3], 1)).toEqual([1]); // floor(3/2)
        expect(dfShiftRight([12], 2)).toEqual([3]);
    });

    it('should drop whole limbs for limb-aligned shifts',
    function() {
        expect(dfShiftRight([0, 1], 26)).toEqual([1]);
        expect(dfShiftRight([5, 0, 1], 52)).toEqual([1]);
    });

    it('should pull bits down across limb boundaries',
    function() {
        // value 2^27 (limb 1 holds 2) shifted right 27 => 1
        expect(dfShiftRight([0, 2], 27)).toEqual([1]);
    });

    it('should return an empty array when the shift discards everything',
    function() {
        expect(dfShiftRight([1, 2], 60)).toEqual([]);
        expect(dfShiftRight([], 5)).toEqual([]);
    });
});
