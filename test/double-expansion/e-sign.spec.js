
import { expect } from 'chai';
import { describe } from 'mocha';

import { eSign } from '../../node/index.js';


describe('eign', function() {
	it('should correctly return the sign of some floating point expansions', 
	function() {
        // Some floating point expansions
        let a = [-4.357806199228875e-10, 11_638_607.274152497];
        let b = [8.661162134715461e-10, 9_722_431.969870245];
        let c = [4.511949494578893e-11, -2_797_357.2918064594];

        expect(eSign(a)).to.be.greaterThan(0);
        expect(eSign(b)).to.be.greaterThan(0);
        expect(eSign(c)).to.be.lessThan(0);
    });
});
