import { describe, expect, it } from '@jest/globals';
import { dfMantissaBitLength } from '../../src/infinite-precision/mantissa-bit-length.js';


describe('dfMantissaBitLength', function() {
    it('should be 0 for an empty mantissa',
    function() {
        expect(dfMantissaBitLength([])).toBe(0);
    });

    it('should count significant bits within a single limb',
    function() {
        expect(dfMantissaBitLength([1])).toBe(1);
        expect(dfMantissaBitLength([0b101])).toBe(3);
        expect(dfMantissaBitLength([2 ** 26 - 1])).toBe(26);
    });

    it('should account for higher limbs',
    function() {
        // top limb 1 => (2 - 1) * 26 + 1 = 27 bits
        expect(dfMantissaBitLength([0, 1])).toBe(27);
        // top limb 0b101 => 26 + 3 = 29 bits
        expect(dfMantissaBitLength([12345, 0b101])).toBe(29);
    });
});
