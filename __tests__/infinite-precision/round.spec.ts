import { describe, expect, it } from '@jest/globals';
import { dfRound } from '../../src/infinite-precision/round.js';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { dfToDouble } from '../../src/infinite-precision/to-double.js';
import { dfIsZero } from '../../src/infinite-precision/is-zero.js';
import { dfMantissaBitLength } from '../../src/infinite-precision/mantissa-bit-length.js';


describe('dfRound', function() {
    it('should return the canonical zero for zero',
    function() {
        expect(dfIsZero(dfRound(dfFromDouble(0), 10))).toBe(true);
    });

    it('should leave values already within the precision unchanged',
    function() {
        expect(dfToDouble(dfRound(dfFromDouble(13), 10))).toBe(13);
    });

    it('should round to the nearest representable value',
    function() {
        // 15 to 2 bits: nearest multiple of 4 is 16 (dist 1) not 12 (dist 3)
        expect(dfToDouble(dfRound(dfFromDouble(15), 2))).toBe(16);
        // 13 to 2 bits: nearest multiple of 4 is 12 (dist 1) not 16 (dist 3)
        expect(dfToDouble(dfRound(dfFromDouble(13), 2))).toBe(12);
    });

    it('should break ties toward the even mantissa',
    function() {
        // 6 to 1 bit: halfway between 4 and 8 => even multiple 8
        expect(dfToDouble(dfRound(dfFromDouble(6), 1))).toBe(8);
        // 5 to 2 bits: halfway between 4 and 6 => even multiple 4
        expect(dfToDouble(dfRound(dfFromDouble(5), 2))).toBe(4);
    });

    it('should round negatives by magnitude',
    function() {
        expect(dfToDouble(dfRound(dfFromDouble(-15), 2))).toBe(-16);
    });

    it('should limit the resulting mantissa to at most `prec` bits',
    function() {
        const r = dfRound(dfFromDouble(2 ** 53 - 1), 30);
        expect(dfMantissaBitLength(r.mantissa)).toBeLessThanOrEqual(30);
    });

    it('should limit the mantissa to `prec` bits when rounding carries out of the top bit',
    function() {
        // 7 = 0b111 to 2 bits => 8 = 0b1000 (4 bits before the fix)
        const r = dfRound(dfFromDouble(7), 2);
        expect(dfToDouble(r)).toBe(8);
        expect(dfMantissaBitLength(r.mantissa)).toBeLessThanOrEqual(2);

        // a carry across a limb boundary: 2^53 - 1 to 30 bits => 2^53
        const s = dfRound(dfFromDouble(2**53 - 1), 30);
        expect(dfToDouble(s)).toBe(2**53);
        expect(dfMantissaBitLength(s.mantissa)).toBeLessThanOrEqual(30);
    });

    it('should not mutate its input',
    function() {
        const x = dfFromDouble(15);
        const before = JSON.parse(JSON.stringify(x));
        dfRound(x, 2);
        expect(x).toEqual(before);
    });
});
