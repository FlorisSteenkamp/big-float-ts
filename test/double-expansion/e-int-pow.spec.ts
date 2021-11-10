
import { expect } from 'chai';
import { describe } from 'mocha';

import { eIntPow } from '../../node/index.js';

describe('eIntPow', function() {
	it('should correctly return the integer power of a floating point expansion without any error', 
	function() {
		{
			let a = [2];

			expect(eIntPow(a,0)).to.eql([1]);
			expect(eIntPow(a,1)).to.eql([2]);
			expect(eIntPow(a,2)).to.eql([4]);
			expect(eIntPow(a,8)).to.eql([256]);
		}
	});
});