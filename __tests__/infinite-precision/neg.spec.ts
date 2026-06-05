import { describe, expect, it } from '@jest/globals';
import { dfNeg } from '../../src/infinite-precision/neg.js';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { dfToDouble } from '../../src/infinite-precision/to-double.js';
import { dfIsZero } from '../../src/infinite-precision/is-zero.js';


describe('dfNeg', function() {
    it('should flip the sign of a value',
    function() {
        for (const v of [1, -1, 0.1, 1234.5, 2 ** 60, 5e-324]) {
            expect(dfToDouble(dfNeg(dfFromDouble(v)))).toBe(-v);
        }
    });

    it('should leave zero as the canonical zero',
    function() {
        const z = dfNeg(dfFromDouble(0));
        expect(dfIsZero(z)).toBe(true);
        expect(z).toEqual({ sign: 0, mantissa: [], exp: 0 });
    });

    it('should be an involution (neg of neg is the original)',
    function() {
        for (const v of [3.5, -7.25, 0.1, 2 ** 53 + 0]) {
            expect(dfToDouble(dfNeg(dfNeg(dfFromDouble(v))))).toBe(v);
        }
    });

    it('should not mutate its input',
    function() {
        const x = dfFromDouble(42);
        const before = JSON.parse(JSON.stringify(x));
        dfNeg(x);
        expect(x).toEqual(before);
    });
});
