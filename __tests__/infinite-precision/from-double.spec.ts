import { describe, expect, it } from '@jest/globals';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { dfToDouble } from '../../src/infinite-precision/to-double.js';
import { dfIsZero } from '../../src/infinite-precision/is-zero.js';


/** A representative spread of finite doubles that must round-trip exactly. */
const exactDoubles = [
    0,
    1,
    -1,
    2,
    0.5,
    -0.5,
    0.1,
    -0.1,
    0.2,
    3.141592653589793,
    123456789,
    -987654321,
    2 ** 52,
    2 ** 53,
    2 ** -52,
    2 ** 60,
    2 ** -60,
    1.7976931348623157e308,  // Number.MAX_VALUE
    2.2250738585072014e-308, // smallest normal
    5e-324,                  // smallest subnormal (Number.MIN_VALUE)
    1.5e-323,                // a small subnormal
];


describe('dfFromDouble', function() {
    it('should produce a canonical zero for +0',
    function() {
        expect(dfFromDouble(0)).toEqual({ sign: 0, mantissa: [], exp: 0 });
        expect(dfIsZero(dfFromDouble(0))).toBe(true);
    });

    it('should normalise -0 to the canonical (positive) zero',
    function() {
        expect(dfFromDouble(-0)).toEqual({ sign: 0, mantissa: [], exp: 0 });
    });

    it('should set the sign bit for negative values',
    function() {
        expect(dfFromDouble(-1).sign).toBe(1);
        expect(dfFromDouble(1).sign).toBe(0);
    });

    it('should round-trip every finite double exactly through dfToDouble',
    function() {
        for (const v of exactDoubles) {
            expect(dfToDouble(dfFromDouble(v))).toBe(v);
        }
    });

    it('should throw on non-finite values',
    function() {
        expect(() => dfFromDouble(NaN)).toThrow();
        expect(() => dfFromDouble(Infinity)).toThrow();
        expect(() => dfFromDouble(-Infinity)).toThrow();
    });
});
