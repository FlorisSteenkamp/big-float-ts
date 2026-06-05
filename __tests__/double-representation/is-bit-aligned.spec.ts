import { describe, expect, it } from '@jest/globals';
import { isBitAligned } from '../../src/double-representation/is-bit-aligned.js';


describe('grid aligned', function() {
    it('should check grid aligned correctly', 
    function() {
        expect( isBitAligned(0, 1, 10)).toBeTruthy();
        expect( isBitAligned(1, 1, 0)).toBeTruthy();
        expect(!isBitAligned(2, 1, 0)).toBeTruthy();
        expect( isBitAligned(2, 1, 1)).toBeTruthy();
        expect(!isBitAligned(4, 1, 1)).toBeTruthy();
        expect( isBitAligned(4, 1, 2)).toBeTruthy();
        expect(!isBitAligned(1/65536, 1, -15)).toBeTruthy();
        expect( isBitAligned(1/65536, 1, -16)).toBeTruthy();
        expect(!isBitAligned(1/65536, 1, -17)).toBeTruthy();
        expect(!isBitAligned(1/65535, 1, -16)).toBeTruthy();
        expect(!isBitAligned(1/65537, 1, -16)).toBeTruthy();
        expect( isBitAligned(65535, 16, 0)).toBeTruthy();
        expect(!isBitAligned(65535, 15, 0)).toBeTruthy();
        expect(!isBitAligned(65536, 15, 0)).toBeTruthy();
        expect(!isBitAligned(65536, 16, 0)).toBeTruthy();
        expect( isBitAligned(65536, 17, 0)).toBeTruthy();
        expect( isBitAligned(65536, 12, 5)).toBeTruthy();
        expect( isBitAligned(65536, 1, 16)).toBeTruthy();
        expect(!isBitAligned(65536, 1, 17)).toBeTruthy();
    });
});