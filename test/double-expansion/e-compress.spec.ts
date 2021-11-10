import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { eCompress } from '../../node/index.js';
import { isNonOverlappingAll } from '../../node/double-expansion/is-overlapping.js';
import { isValid } from '../helpers/is-valid.js';


/**
 * 
 * @param e 
 * @param res 
 */
function check(e: number[], res: number[]) {
    assert(
        isNonOverlappingAll(e),
        'The input should be a non-overlapping expansion.'
    );

    let result = eCompress(e);

    assert(
        isValid(result),
        'The result should be a non-overlapping, non-adjacent expansion'
    );

    expect(result).to.eql(res);
}


describe('eCompress', function() {
	it('should correctly eCompress some floating point number expansions', 
	function() {
        check(
            [1, 2, 4, 8],
            [15]
        );

        check(
            [0, 0, -5.551115123125783e-17, 0.6000000000000001],
            [-5.551115123125783e-17, 0.6000000000000001]
        );

        check(
            [0,3],
            [3]
        );

        check(
            [0, 2e-101, 0, 4.6e-81, 0, 9.12e-61, 0, 1.56e-40, 0, 1.998e-20],
            [2e-101, 4.6e-81, 9.12e-61, 1.56e-40, 1.998e-20]
        );
	});
});
