import { describe, expect, it } from '@jest/globals';
import { dfToExpansion } from '../../src/infinite-precision/to-expansion.js';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { dfAdd } from '../../src/infinite-precision/add.js';


describe('dfToExpansion', function() {
    it('should map zero to [0]',
    function() {
        expect(dfToExpansion(dfFromDouble(0))).toEqual([0]);
    });

    it('should return a single component for values that fit in one double',
    function() {
        expect(dfToExpansion(dfFromDouble(1))).toEqual([1]);
        expect(dfToExpansion(dfFromDouble(-3.5))).toEqual([-3.5]);
    });

    it('should split a >53-bit value into nonoverlapping components',
    function() {
        // 2^60 + 1 needs 61 bits: low window holds 1, high window holds 2^60.
        const x = dfAdd(dfFromDouble(2 ** 60), dfFromDouble(1));
        expect(dfToExpansion(x)).toEqual([1, 2 ** 60]);
    });

    it('should produce components in increasing magnitude that sum exactly',
    function() {
        const x = dfAdd(dfFromDouble(2 ** 70), dfFromDouble(2 ** 5));
        const e = dfToExpansion(x);
        // increasing magnitude
        for (let i = 1; i < e.length; i++) {
            expect(Math.abs(e[i])).toBeGreaterThan(Math.abs(e[i - 1]));
        }
        expect(e).toEqual([2 ** 5, 2 ** 70]);
    });

    it('should carry the sign into every component',
    function() {
        const x = dfAdd(dfFromDouble(-(2 ** 60)), dfFromDouble(-1));
        expect(dfToExpansion(x)).toEqual([-1, -(2 ** 60)]);
    });
});
