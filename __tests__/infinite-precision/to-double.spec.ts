import { describe, expect, it } from '@jest/globals';
import { dfToDouble } from '../../src/infinite-precision/to-double.js';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { DF_ZERO } from '../../src/infinite-precision/zero.js';
import { dfAdd } from '../../src/infinite-precision/add.js';
import { dfMul } from '../../src/infinite-precision/mul.js';
import { dfNeg } from '../../src/infinite-precision/neg.js';


describe('dfToDouble', function() {
    it('should return 0 for the canonical zero',
    function() {
        expect(dfToDouble(DF_ZERO)).toBe(0);
    });

    it('should round half-to-even when the exact value needs more than 53 bits',
    function() {
        const twoPow53 = 2 ** 53; // 9007199254740992, last representable odd-free

        // 2^53 + 1 is exactly halfway between 2^53 and 2^53 + 2 => round to even.
        expect(dfToDouble(dfAdd(dfFromDouble(twoPow53), dfFromDouble(1)))).toBe(twoPow53);

        // 2^53 + 2 is exactly representable.
        expect(dfToDouble(dfAdd(dfFromDouble(twoPow53), dfFromDouble(2)))).toBe(twoPow53 + 2);

        // 2^53 + 3 is halfway between 2^53 + 2 and 2^53 + 4 => round to even (+4).
        expect(dfToDouble(dfAdd(dfFromDouble(twoPow53), dfFromDouble(3)))).toBe(twoPow53 + 4);
    });

    it('should overflow to the correctly-signed Infinity',
    function() {
        const huge = dfMul(dfFromDouble(1e200), dfFromDouble(1e200)); // 1e400
        expect(dfToDouble(huge)).toBe(Infinity);
        expect(dfToDouble(dfNeg(huge))).toBe(-Infinity);
    });

    it('should underflow to zero',
    function() {
        const tiny = dfMul(dfFromDouble(1e-300), dfFromDouble(1e-300)); // 1e-600
        expect(dfToDouble(tiny)).toBe(0);
    });
});
