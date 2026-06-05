import { describe, expect, it } from '@jest/globals';
import { dfTruncate } from '../../src/infinite-precision/truncate.js';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { dfToDouble } from '../../src/infinite-precision/to-double.js';
import { dfIsZero } from '../../src/infinite-precision/is-zero.js';
import { dfMantissaBitLength } from '../../src/infinite-precision/mantissa-bit-length.js';


describe('dfTruncate', function() {
    it('should return the canonical zero for zero',
    function() {
        expect(dfIsZero(dfTruncate(dfFromDouble(0), 10))).toBe(true);
    });

    it('should leave values already within the precision unchanged',
    function() {
        const x = dfFromDouble(13); // 4 significant bits
        const t = dfTruncate(x, 10);
        expect(dfToDouble(t)).toBe(13);
    });

    it('should drop low bits, rounding toward zero',
    function() {
        // 15 = 0b1111 truncated to 2 bits => keep 0b11, scaled by 2^2 => 12
        expect(dfToDouble(dfTruncate(dfFromDouble(15), 2))).toBe(12);
        // 13 = 0b1101 truncated to 2 bits => keep 0b11 << 2 => 12
        expect(dfToDouble(dfTruncate(dfFromDouble(13), 2))).toBe(12);
    });

    it('should never increase the magnitude (toward zero for negatives too)',
    function() {
        // -15 truncated to 2 bits => -12 (closer to zero)
        expect(dfToDouble(dfTruncate(dfFromDouble(-15), 2))).toBe(-12);
    });

    it('should limit the resulting mantissa to at most `prec` bits',
    function() {
        const t = dfTruncate(dfFromDouble(2 ** 53 - 1), 30);
        expect(dfMantissaBitLength(t.mantissa)).toBeLessThanOrEqual(30);
    });

    it('should not mutate its input',
    function() {
        const x = dfFromDouble(15);
        const before = JSON.parse(JSON.stringify(x));
        dfTruncate(x, 2);
        expect(x).toEqual(before);
    });
});
