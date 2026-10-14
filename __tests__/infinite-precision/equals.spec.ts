import { describe, expect, it } from '@jest/globals';
import { dfEquals } from '../../src/infinite-precision/equals.js';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { dfAdd } from '../../src/infinite-precision/add.js';
import { dfSub } from '../../src/infinite-precision/sub.js';
import { dfMul } from '../../src/infinite-precision/mul.js';
import { dfNeg } from '../../src/infinite-precision/neg.js';
import { dfRound } from '../../src/infinite-precision/round.js';
import { DF_ZERO } from '../../src/infinite-precision/zero.js';


const df = dfFromDouble;

function randomDouble() {
    return (Math.random() - 0.5) * 2**Math.floor(Math.random()*400 - 200);
}


describe('dfEquals', function() {
    it('should have a unique (odd mantissa) representation per value',
    function() {
        // the same value reached in different ways
        expect(dfAdd(df(1), df(1))).toEqual(df(2));
        expect(dfMul(df(4), df(0.5))).toEqual(df(2));
        expect(dfAdd(df(1), df(1))).toEqual({ sign: 0, mantissa: [1], exp: 1 });
        expect(dfRound(df(7), 2)).toEqual(df(8));

        for (let i=0; i<2000; i++) {
            const x = df(randomDouble());
            expect(x.mantissa.length === 0 || x.mantissa[0] % 2 === 1).toBe(true);
        }
    });

    it('should return true for equal values reached in different ways',
    function() {
        for (let i=0; i<2000; i++) {
            const a = df(randomDouble());
            const b = df(randomDouble());
            const k = df(2**Math.floor(Math.random()*100 - 50));

            expect(dfEquals(dfAdd(a,b), dfAdd(b,a))).toBe(true);
            expect(dfEquals(dfSub(dfAdd(a,b), b), a)).toBe(true);
            expect(dfEquals(dfMul(dfAdd(a,b), k), dfAdd(dfMul(a,k), dfMul(b,k)))).toBe(true);
        }
        expect(dfEquals(dfSub(df(3), df(3)), DF_ZERO)).toBe(true);
    });

    it('should return false for different values',
    function() {
        expect(dfEquals(df(2), df(3))).toBe(false);
        expect(dfEquals(df(2), dfNeg(df(2)))).toBe(false);
        expect(dfEquals(df(2), df(4))).toBe(false);
        expect(dfEquals(df(1), DF_ZERO)).toBe(false);
        expect(dfEquals(dfAdd(df(2**60), df(1)), df(2**60))).toBe(false);
    });
});
