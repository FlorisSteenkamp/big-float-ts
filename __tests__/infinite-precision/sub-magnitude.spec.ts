import { describe, expect, it } from '@jest/globals';
import { dfSubMagnitude } from '../../src/infinite-precision/sub-magnitude.js';
import { LIMB_BASE } from '../../src/infinite-precision/dyadic-float.js';


describe('dfSubMagnitude', function() {
    it('should subtract limb-by-limb with no borrow',
    function() {
        expect(dfSubMagnitude([3], [2])).toEqual([1]);
        expect(dfSubMagnitude([5, 9], [2, 4])).toEqual([3, 5]);
    });

    it('should propagate a borrow from a higher limb',
    function() {
        expect(dfSubMagnitude([0, 1], [1])).toEqual([LIMB_BASE - 1, 0]);
    });

    it('should yield zero limbs when the operands are equal',
    function() {
        expect(dfSubMagnitude([7, 3], [7, 3])).toEqual([0, 0]);
    });
});
