import { describe, expect, it } from '@jest/globals';
import { growExpansion } from '../../src/double-expansion/grow-expansion.js';
import { eCompress } from '../../src/double-expansion/e-compress.js';
import { isNonOverlappingAll } from '../../src/double-expansion/is-overlapping.js';;
import { isValid } from '../helpers/is-valid.js';


describe('grow expansion (i.e. a[] + b)', function() {
	it('should add two numbers (via growExpansion) without any error', 
	function() {
		let a = [3.01e-19, 2e-1];
		let b = 4e+1;

		expect(
			isNonOverlappingAll(a)
		).toBeTruthy();

		let e = growExpansion(a,b);

		expect(
			isValid(e)
		).toBeTruthy();

		expect(e).toEqual([
			3.01e-19,
			-2.831068712794149e-15,
			40.2
		]);

		expect(eCompress(e)).toEqual([
			1.5542254651204993e-31,
			-2.8307677127941493e-15,
			40.2
		]);
	});
});
