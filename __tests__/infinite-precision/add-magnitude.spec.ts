import { describe, expect, it } from '@jest/globals';
import { dfAddMagnitude } from '../../src/infinite-precision/add-magnitude.js';
import { LIMB_BASE } from '../../src/infinite-precision/dyadic-float.js';


describe('dfAddMagnitude', function() {
    it('should add limb-by-limb with no carry',
    function() {
        expect(dfAddMagnitude([1], [2])).toEqual([3]);
        expect(dfAddMagnitude([1, 2], [3, 4])).toEqual([4, 6]);
    });

    it('should propagate a carry into a new high limb',
    function() {
        expect(dfAddMagnitude([LIMB_BASE - 1], [1])).toEqual([0, 1]);
    });

    it('should handle operands of different lengths',
    function() {
        expect(dfAddMagnitude([1], [2, 3])).toEqual([3, 3]);
        expect(dfAddMagnitude([5, 6, 7], [1])).toEqual([6, 6, 7]);
    });
});
