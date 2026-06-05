import { describe, expect, it } from '@jest/globals';
import { eIntPow } from '../../src/double-expansion/e-int-pow.js';


describe('eIntPow', function() {
	it('should correctly return the integer power of a floating point expansion without any error', 
	function() {
		{
			let a = [2];

			expect(eIntPow(a,0)).toEqual([1]);
			expect(eIntPow(a,1)).toEqual([2]);
			expect(eIntPow(a,2)).toEqual([4]);
			expect(eIntPow(a,8)).toEqual([256]);
		}
	});
});