import { describe, expect, it } from '@jest/globals';
import { eMultByNeg2 } from '../../src/double-expansion/e-mult-by-neg-2.js';


describe('eMultByNeg2', function() {
	it('should correctly multiply some double floating point expansions by -2', 
	function() {
        let a = [-4.357806199228875e-10, 11_638_607.274152497];

        expect(eMultByNeg2(a)).toEqual([8.71561239845775e-10, -23277214.548304994]);
    });
});
