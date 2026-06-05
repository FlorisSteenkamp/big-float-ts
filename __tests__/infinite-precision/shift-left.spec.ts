import { describe, expect, it } from '@jest/globals';
import { dfShiftLeft } from '../../src/infinite-precision/shift-left.js';
import { LIMB_BASE } from '../../src/infinite-precision/dyadic-float.js';


describe('dfShiftLeft', function() {
    it('should return a copy for a zero shift',
    function() {
        const m = [1, 2];
        const out = dfShiftLeft(m, 0);
        expect(out).toEqual([1, 2]);
        expect(out).not.toBe(m);
    });

    it('should return a copy for an empty mantissa',
    function() {
        expect(dfShiftLeft([], 5)).toEqual([]);
    });

    it('should shift within a limb (multiply by 2^bits)',
    function() {
        expect(dfShiftLeft([1], 1)).toEqual([2]);
        expect(dfShiftLeft([3], 2)).toEqual([12]);
    });

    it('should insert whole zero limbs for limb-aligned shifts',
    function() {
        expect(dfShiftLeft([1], 26)).toEqual([0, 1]);
        expect(dfShiftLeft([1], 52)).toEqual([0, 0, 1]);
    });

    it('should carry across limb boundaries',
    function() {
        // 1 << 27 = 2^27 = 2 * 2^26 => limb 1 holds 2
        expect(dfShiftLeft([1], 27)).toEqual([0, 2]);
        // (LIMB_BASE - 1) << 1 spills its top bit into the next limb
        expect(dfShiftLeft([LIMB_BASE - 1], 1)).toEqual([LIMB_BASE - 2, 1]);
    });
});
