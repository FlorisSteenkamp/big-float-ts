import { describe, expect, it } from '@jest/globals';
import { dfCompare, dfSign } from '../../src/infinite-precision/compare.js';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { dfAdd } from '../../src/infinite-precision/add.js';
import { dfNeg } from '../../src/infinite-precision/neg.js';
import { DF_ZERO } from '../../src/infinite-precision/zero.js';


const df = dfFromDouble;

function randomDouble() {
    // a small exponent range so that close and equal values occur often
    return Math.round((Math.random() - 0.5) * 64) * 2**Math.floor(Math.random()*6 - 3);
}


describe('dfSign', function() {
    it('should return the sign of a value',
    function() {
        expect(dfSign(df(3))).toBe(1);
        expect(dfSign(df(-3))).toBe(-1);
        expect(dfSign(DF_ZERO)).toBe(0);
    });
});


describe('dfCompare', function() {
    it('should agree with comparing the doubles',
    function() {
        for (let i=0; i<5000; i++) {
            const a = randomDouble();
            const b = randomDouble();
            expect(dfCompare(df(a), df(b))).toBe(Math.sign(a - b) || 0);
        }
    });

    it('should compare values that differ beyond double precision',
    function() {
        const big = df(2**60);
        const bigPlus1 = dfAdd(big, df(1));    // 2^60 + 1 (not a double)
        const bigPlus2 = dfAdd(big, df(2));    // 2^60 + 2 (not a double)

        expect(dfCompare(bigPlus1, big)).toBe(1);
        expect(dfCompare(big, bigPlus1)).toBe(-1);
        expect(dfCompare(bigPlus1, bigPlus2)).toBe(-1);
        expect(dfCompare(bigPlus1, bigPlus1)).toBe(0);
        // negatives reverse the order
        expect(dfCompare(dfNeg(bigPlus1), dfNeg(big))).toBe(-1);
        expect(dfCompare(dfNeg(big), bigPlus1)).toBe(-1);
        expect(dfCompare(DF_ZERO, dfNeg(big))).toBe(1);
        expect(dfCompare(DF_ZERO, DF_ZERO)).toBe(0);
    });
});
