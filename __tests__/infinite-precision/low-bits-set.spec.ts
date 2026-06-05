import { describe, expect, it } from '@jest/globals';
import { dfLowBitsSet } from '../../src/infinite-precision/low-bits-set.js';


describe('dfLowBitsSet', function() {
    it('should be false when k <= 0',
    function() {
        expect(dfLowBitsSet([0b111], 0)).toBe(false);
        expect(dfLowBitsSet([0b111], -3)).toBe(false);
    });

    it('should detect set bits within the low k positions of one limb',
    function() {
        const m = [0b100]; // only bit 2 set
        expect(dfLowBitsSet(m, 1)).toBe(false); // bit 0
        expect(dfLowBitsSet(m, 2)).toBe(false); // bits 0,1
        expect(dfLowBitsSet(m, 3)).toBe(true);  // bits 0,1,2
    });

    it('should detect set bits spanning multiple limbs',
    function() {
        const m = [0, 1]; // bit 26 set
        expect(dfLowBitsSet(m, 26)).toBe(false); // bits 0..25
        expect(dfLowBitsSet(m, 27)).toBe(true);  // includes bit 26
    });
});
