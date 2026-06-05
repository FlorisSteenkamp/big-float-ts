import { describe, expect, it } from '@jest/globals';
import { scaleExpansion, scaleExpansion2 } from '../../src/double-expansion/scale-expansion.js';
import { isNonOverlappingAll } from '../../src/double-expansion/is-overlapping.js';
import { isValid } from '../helpers/is-valid.js';


describe('scaleExpansion (i.e. a[] * b)', function() {
	it('should scale an expansion without any round-off error', 
	function() {
		let e = [3.01e-19, 0.2];
		let b = 4;

		expect(
			isNonOverlappingAll(e)
		).toBeTruthy();

		let r = scaleExpansion(e,b);
		let s = scaleExpansion2(b,e);

		expect(
			isValid(r)
		).toBeTruthy();

		expect(r).toEqual([
			1.204e-18,
			0.8
		]);

		expect(r).toEqual(s);
	});
});
