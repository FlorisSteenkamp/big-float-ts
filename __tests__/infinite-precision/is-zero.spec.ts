import { describe, expect, it } from '@jest/globals';
import { dfIsZero } from '../../src/infinite-precision/is-zero.js';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { DF_ZERO } from '../../src/infinite-precision/zero.js';


describe('dfIsZero', function() {
    it('should be true for the canonical zero',
    function() {
        expect(dfIsZero(DF_ZERO)).toBe(true);
    });

    it('should be true for +0 and -0 converted from a double',
    function() {
        expect(dfIsZero(dfFromDouble(0))).toBe(true);
        expect(dfIsZero(dfFromDouble(-0))).toBe(true);
    });

    it('should be false for non-zero values',
    function() {
        expect(dfIsZero(dfFromDouble(1))).toBe(false);
        expect(dfIsZero(dfFromDouble(-1))).toBe(false);
        expect(dfIsZero(dfFromDouble(1e-300))).toBe(false);
        expect(dfIsZero(dfFromDouble(5e-324))).toBe(false);
    });
});
