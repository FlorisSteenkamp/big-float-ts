
import { expect } from 'chai';
import { describe } from 'mocha';

import { eDivBy2 } from '../../src/index.js';


describe('eDivBy2', function() {
	it('should correctly divide some double floating point expansions', 
	function() {
        // Some double-doubles
        let a = [4.511949494578893e-11, -2797357.2918064594];

        expect(eDivBy2(a)).to.eql([2.2559747472894465e-11, -1398678.6459032297]);
    });
});
