import { describe, expect, it } from '@jest/globals';
import { dfLimbBitLength } from '../../src/infinite-precision/limb-bit-length.js';


describe('dfLimbBitLength', function() {
    it('should be 0 for an empty limb',
    function() {
        expect(dfLimbBitLength(0)).toBe(0);
    });

    it('should count the position of the most-significant set bit',
    function() {
        expect(dfLimbBitLength(1)).toBe(1);
        expect(dfLimbBitLength(2)).toBe(2);
        expect(dfLimbBitLength(3)).toBe(2);
        expect(dfLimbBitLength(7)).toBe(3);
        expect(dfLimbBitLength(8)).toBe(4);
    });

    it('should handle the largest possible limb value (2^26 - 1)',
    function() {
        expect(dfLimbBitLength(2 ** 26 - 1)).toBe(26);
        expect(dfLimbBitLength(2 ** 25)).toBe(26);
    });
});
