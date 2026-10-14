import { describe, expect, it } from '@jest/globals';
import { eCompress } from '../../src/double-expansion/e-compress.js';
import { scaleExpansion, scaleExpansion2 } from '../../src/double-expansion/scale-expansion.js';
import { eProduct } from '../../src/double-expansion/e-product.js';
import { eCalculate } from '../../src/double-expansion/e-calculate.js';
import { expansionProduct } from '../../src/double-expansion/expansion-product.js';


describe('empty input', function() {
    it('should treat an empty expansion as 0', 
    function() {
        expect(eCompress([])).toEqual([0]);
        expect(scaleExpansion([], 3)).toEqual([0]);
        expect(scaleExpansion2(3, [])).toEqual([0]);
        expect(expansionProduct([], [1, 2**60])).toEqual([0]);
    });

    it('should treat an empty product as 1', 
    function() {
        expect(eProduct([])).toEqual([1]);
        expect(eCalculate([[]])).toEqual([0, 1]);
        expect(eCalculate([[], [[2],[3]]])).toEqual([7]);
    });
});
