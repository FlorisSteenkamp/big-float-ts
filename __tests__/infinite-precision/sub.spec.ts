import { describe, expect, it } from '@jest/globals';
import { dfSub } from '../../src/infinite-precision/sub.js';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { dfToDouble } from '../../src/infinite-precision/to-double.js';
import { dfIsZero } from '../../src/infinite-precision/is-zero.js';


describe('dfSub', function() {
    it('should subtract values whose difference is exactly representable',
    function() {
        const cases: [number, number][] = [
            [3, 2],
            [2, 3],
            [0.5, 0.25],
            [-1, 1],
            [100, 7],
            [2 ** 60, 2 ** 59],
        ];
        for (const [a, b] of cases) {
            expect(dfToDouble(dfSub(dfFromDouble(a), dfFromDouble(b)))).toBe(a - b);
        }
    });

    it('should give the canonical zero when subtracting a value from itself',
    function() {
        for (const v of [0, 1, -3.25, 0.1, 2 ** 60]) {
            expect(dfIsZero(dfSub(dfFromDouble(v), dfFromDouble(v)))).toBe(true);
        }
    });

    it('should be anti-commutative',
    function() {
        const a = dfFromDouble(12.5);
        const b = dfFromDouble(4.25);
        expect(dfToDouble(dfSub(a, b))).toBe(-dfToDouble(dfSub(b, a)));
    });

    it('should be exact beyond double precision',
    function() {
        // (2^60 + 1) - 2^60 === 1 exactly, unlike the naive double computation.
        const big = dfFromDouble(2 ** 60);
        const onePlusBig = dfSub(big, dfFromDouble(-1)); // 2^60 + 1, exact
        expect(dfToDouble(dfSub(onePlusBig, big))).toBe(1);

        // Sanity: the naive double computation loses the 1.
        expect((2 ** 60 + 1) - 2 ** 60).toBe(0);
    });

    it('should not mutate its inputs',
    function() {
        const a = dfFromDouble(10.5);
        const b = dfFromDouble(2.25);
        const aBefore = JSON.parse(JSON.stringify(a));
        const bBefore = JSON.parse(JSON.stringify(b));
        dfSub(a, b);
        expect(a).toEqual(aBefore);
        expect(b).toEqual(bBefore);
    });
});
