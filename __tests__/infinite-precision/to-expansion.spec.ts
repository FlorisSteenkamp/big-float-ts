import { describe, expect, it } from '@jest/globals';
import { dfToExpansion } from '../../src/infinite-precision/to-expansion.js';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { dfAdd } from '../../src/infinite-precision/add.js';
import { dfSub } from '../../src/infinite-precision/sub.js';
import { dfIsZero } from '../../src/infinite-precision/is-zero.js';
import { eToDyadicFloat } from '../../src/double-expansion/e-to-dyadic-float.js';
import { isAdjacent } from '../../src/double-expansion/is-adjacent.js';


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

    it('should not produce adjacent components',
    function() {
        // 2^60 - 1: the low 53-bit window is all ones and the next window
        // holds bits 53..59 - these would be adjacent without compression
        const x = dfAdd(dfFromDouble(2 ** 60 - 128), dfFromDouble(127));
        const e = dfToExpansion(x);
        for (let i = 1; i < e.length; i++) {
            expect(isAdjacent(e[i - 1], e[i])).toBe(false);
        }
        // and the value is still exact
        expect(dfIsZero(dfSub(eToDyadicFloat(e), x))).toBe(true);
    });

    it('should carry the sign into every component',
    function() {
        const x = dfAdd(dfFromDouble(-(2 ** 60)), dfFromDouble(-1));
        expect(dfToExpansion(x)).toEqual([-1, -(2 ** 60)]);
    });
});
