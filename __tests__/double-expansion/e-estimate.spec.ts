import { describe, expect, it } from '@jest/globals';
import { eEstimate } from '../../src/double-expansion/e-estimate.js';


describe('eEstimate', function() {
	it('should eEstimate a value correctly from an expansion',
	function() {
        // zero should equal 0
        expect(eEstimate([1,2,3,4])).toEqual(10);
	});
});



