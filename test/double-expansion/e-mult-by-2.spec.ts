
import { expect } from 'chai';
import { describe } from 'mocha';

import { eMultBy2 } from '../../src/index.js';


describe('eMultBy2', function() {
	it('should correctly multiply some double floating point expansions by 2', 
	function() {
        let a = [-4.357806199228875e-10, 11_638_607.274152497];

        expect(eMultBy2(a)).to.eql([-8.71561239845775e-10, 23277214.548304994]);
    });
});
