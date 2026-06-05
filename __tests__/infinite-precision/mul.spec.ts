import { describe, expect, it } from '@jest/globals';
import { dfMul } from '../../src/infinite-precision/mul.js';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { dfToDouble } from '../../src/infinite-precision/to-double.js';
import { dfIsZero } from '../../src/infinite-precision/is-zero.js';


describe('dfMul', function() {
    it('should multiply values whose product is exactly representable',
    function() {
        const cases: [number, number][] = [
            [3, 5],
            [-3, 5],
            [3, -5],
            [-3, -5],
            [0.5, 0.25],
            [2 ** 60, 2 ** -60],   // === 1
            [1.5, 4],
            [123456, 789],
        ];
        for (const [a, b] of cases) {
            expect(dfToDouble(dfMul(dfFromDouble(a), dfFromDouble(b)))).toBe(a * b);
        }
    });

    it('should return the canonical zero when either factor is zero',
    function() {
        expect(dfIsZero(dfMul(dfFromDouble(0), dfFromDouble(123)))).toBe(true);
        expect(dfIsZero(dfMul(dfFromDouble(123), dfFromDouble(0)))).toBe(true);
        expect(dfIsZero(dfMul(dfFromDouble(0), dfFromDouble(0)))).toBe(true);
    });

    it('should follow the usual sign rules',
    function() {
        expect(dfMul(dfFromDouble(2), dfFromDouble(3)).sign).toBe(0);
        expect(dfMul(dfFromDouble(-2), dfFromDouble(3)).sign).toBe(1);
        expect(dfMul(dfFromDouble(2), dfFromDouble(-3)).sign).toBe(1);
        expect(dfMul(dfFromDouble(-2), dfFromDouble(-3)).sign).toBe(0);
    });

    it('should be commutative',
    function() {
        const a = dfFromDouble(6.5);
        const b = dfFromDouble(-0.125);
        expect(dfToDouble(dfMul(a, b))).toBe(dfToDouble(dfMul(b, a)));
    });

    it('should be exact for a product that overflows double precision',
    function() {
        // 2^45 * 2^45 === 2^90, exact in the dyadic domain. Multiplying by
        // 2^-90 must recover exactly 1, which a plain-double round-trip cannot
        // guarantee for arbitrary >53-bit products.
        const a = dfMul(dfFromDouble(2 ** 45), dfFromDouble(2 ** 45)); // 2^90
        expect(dfToDouble(dfMul(a, dfFromDouble(2 ** -90)))).toBe(1);
    });

    it('should not mutate its inputs',
    function() {
        const a = dfFromDouble(7.5);
        const b = dfFromDouble(3.25);
        const aBefore = JSON.parse(JSON.stringify(a));
        const bBefore = JSON.parse(JSON.stringify(b));
        dfMul(a, b);
        expect(a).toEqual(aBefore);
        expect(b).toEqual(bBefore);
    });
});
