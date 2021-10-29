
import { expect, assert } from 'chai';
import { describe } from 'mocha';

import { eEstimate, eProduct } from '../../node/index.js';
import { isValid } from '../helpers/is-valid.js';


/**
 * 
 * @param {number[][]} term 
 * @param {number} res 
 */
function check(term, res) {
    let result = eProduct(term);

    for (let multiplicant of term) {
        assert(
            isValid(multiplicant),
            'Should not be an overlapping expansion.'
        );
    }

    expect(eEstimate(result)).to.eql(res);
}


describe('eCalculate', function() {
	it('should correctly calculate the product of several floating point expansions',
	function() {
        check(
            [[2**-8, 2**-4, 1]],
            1.06640625
        );

        // zero should equal 0
        check([[0]], 0);

        // zero times zero is still zero
        check([[0],[0]], 0);

        // two times 3 plus 4 = 6
        check([[2],[3]], 6);

        let a = [-4.357806199228875e-10, 11_638_607.274152497];
        let b = [8.661162134715461e-10, 9_722_431.969870245];
        let c = [4.511949494578893e-11, -2_797_357.2918064594];
        check(
            [a,b,c], 
            -316536551706320100000
        );

        check(
            [[1], [2**-8, 2**-4, 1]],
            1.06640625
        );
	});
});


