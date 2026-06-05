import { describe, expect, it } from '@jest/globals';
import { dfGetBit } from '../../src/infinite-precision/get-bit.js';


describe('dfGetBit', function() {
    it('should read bits within a single limb (little-endian)',
    function() {
        const m = [0b101]; // bit 0 and bit 2 set
        expect(dfGetBit(m, 0)).toBe(1);
        expect(dfGetBit(m, 1)).toBe(0);
        expect(dfGetBit(m, 2)).toBe(1);
        expect(dfGetBit(m, 3)).toBe(0);
    });

    it('should read bits that fall in a higher limb',
    function() {
        const m = [0, 1]; // limb 1 bit 0 => global bit 26
        expect(dfGetBit(m, 25)).toBe(0);
        expect(dfGetBit(m, 26)).toBe(1);
        expect(dfGetBit(m, 27)).toBe(0);
    });

    it('should return 0 for out-of-range positions',
    function() {
        expect(dfGetBit([1], 26)).toBe(0);
        expect(dfGetBit([1], 1000)).toBe(0);
        expect(dfGetBit([], 0)).toBe(0);
    });
});
