import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { scaleExpansion, scaleExpansion2 } from '../../src/index.js';
import { isNonOverlappingAll } from '../../src/index.js';
import { isValid } from '../helpers/is-valid.js';


describe('scaleExpansion (i.e. a[] * b)', function() {
	it('should scale an expansion without any round-off error', 
	function() {
		let e = [3.01e-19, 0.2];
		let b = 4;

		assert(
			isNonOverlappingAll(e), 
			'The first multiplicant should not be an overlapping expansion.'
		);

		let r = scaleExpansion(e,b);
		let s = scaleExpansion2(b,e);

		assert(
			isValid(r),
			'The result of scaleExpansion should be a non-adjacent expansion'
		);

		expect(r).to.eql([
			1.204e-18,
			0.8
		]);

		expect(r).to.eql(s);
	});
});
