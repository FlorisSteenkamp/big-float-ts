import { describe, expect, it } from '@jest/globals';
import { dfAdd } from '../../src/infinite-precision/add.js';
import { dfNeg } from '../../src/infinite-precision/neg.js';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { dfToDouble } from '../../src/infinite-precision/to-double.js';
import { dfIsZero } from '../../src/infinite-precision/is-zero.js';


describe('dfAdd', function() {
    it('should add values whose sum is exactly representable',
    function() {
        const cases: [number, number][] = [
            [1, 2],
            [0.5, 0.25],
            [-1, 1],
            [100, -7],
            [0.1, 0.2],          // exact in the dyadic domain, rounds on output
            [2 ** 60, 2 ** 59],
        ];
        for (const [a, b] of cases) {
            expect(dfToDouble(dfAdd(dfFromDouble(a), dfFromDouble(b)))).toBe(a + b);
        }
    });

    it('should be commutative',
    function() {
        const a = dfFromDouble(123.5);
        const b = dfFromDouble(-0.0078125);
        expect(dfToDouble(dfAdd(a, b))).toBe(dfToDouble(dfAdd(b, a)));
    });

    it('should treat the canonical zero as an identity',
    function() {
        const x = dfFromDouble(-42.25);
        expect(dfToDouble(dfAdd(x, dfFromDouble(0)))).toBe(-42.25);
        expect(dfToDouble(dfAdd(dfFromDouble(0), x))).toBe(-42.25);
    });

    it('should yield the canonical zero when adding a value to its negation',
    function() {
        const x = dfFromDouble(987.625);
        expect(dfIsZero(dfAdd(x, dfNeg(x)))).toBe(true);
    });

    it('should be exact beyond double precision',
    function() {
        // In plain doubles (2^60 + 1) === 2^60, losing the 1. The dyadic sum is
        // exact, so subtracting 2^60 again recovers the 1.
        const big = dfFromDouble(2 ** 60);
        const exactSum = dfAdd(big, dfFromDouble(1)); // 2^60 + 1, exact
        const recovered = dfAdd(exactSum, dfNeg(big)); // back to 1
        expect(dfToDouble(recovered)).toBe(1);

        // Sanity: the naive double computation does lose it.
        expect((2 ** 60 + 1) - 2 ** 60).toBe(0);
    });

    it('should not mutate its inputs',
    function() {
        const a = dfFromDouble(3.5);
        const b = dfFromDouble(9.25);
        const aBefore = JSON.parse(JSON.stringify(a));
        const bBefore = JSON.parse(JSON.stringify(b));
        dfAdd(a, b);
        expect(a).toEqual(aBefore);
        expect(b).toEqual(bBefore);
    });
});
