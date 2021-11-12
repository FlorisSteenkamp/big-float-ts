
import { expect, assert } from 'chai';
import { describe } from 'mocha';

import { eEstimate } from '../../src/index.js';


describe('eEstimate', function() {
	it('should eEstimate a value correctly from an expansion',
	function() {
        // zero should equal 0
        expect(eEstimate([1,2,3,4])).to.eql(10);
	});
});



