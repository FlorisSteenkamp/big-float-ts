import { describe, expect, it } from '@jest/globals';
import { dfCompareMagnitudeAligned } from '../../src/infinite-precision/compare-magnitude-aligned.js';


describe('dfCompareMagnitudeAligned', function() {
    it('should compare by length first',
    function() {
        expect(dfCompareMagnitudeAligned([1], [1, 0])).toBe(-1);
        expect(dfCompareMagnitudeAligned([1, 0], [1])).toBe(1);
    });

    it('should compare from the most-significant limb down when lengths match',
    function() {
        expect(dfCompareMagnitudeAligned([5, 2], [9, 2])).toBe(-1);
        expect(dfCompareMagnitudeAligned([9, 2], [5, 2])).toBe(1);
        expect(dfCompareMagnitudeAligned([1, 3], [9, 2])).toBe(1);
    });

    it('should return 0 for equal arrays',
    function() {
        expect(dfCompareMagnitudeAligned([7, 3, 1], [7, 3, 1])).toBe(0);
        expect(dfCompareMagnitudeAligned([], [])).toBe(0);
    });
});
