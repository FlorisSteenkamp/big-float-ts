import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { split, eEstimate, eSum } from '../../node/index.js';


/**
 * 
 * @param sum 
 * @param expected 
 */
function check(sum: number[][], expected: number) {
    let result = eSum(sum);
    expect(eEstimate(result)).to.eql(expected);
}


describe('eCalculate sum', function() {
	it('should calculate sum correctly',
	function() {
        // zero should equal 0
        check(
            [[0]],
            0
        );

        // zero add zero is still zero
        check(
            [[0],[0]],
            0
        );

        // 6 plus 4 === 10
        check(
            [[6], [4]],
            10
        );

        // 0.1 + 0.2 === 0.3ish
        check(
            [[0.1], [0.2]],
            0.30000000000000004
        );

        // 2 + 24 + 6 === 32
        check(
            [[2], [24], [6]],
            32
        );

        // some complicated sum
        // 0.00289080862514 + 
        // 8.11206277735137373945878448 + 
        // 7.71722568769361084779904
        check(
            [[0.00289080862514], 
             [8.11206277735137373945878448], 
             [7.71722568769361084779904]],
            15.83217927367012458725782448
        );

        // some more complicated sum
        // 0.123421*0.1*0.2342234 + 
        // 0.23345554*2.123123*3.76564*4.3462346 + 
        // 3.2354123*2.1231232*1.123456789 = 15.83217927367012458725782448
        check(
            [
                split(0.00289080862514).reverse(), 
                split(8.11206277735137373945878448).reverse(),
                split(7.71722568769361084779904).reverse(),
            ],
            15.83217927367012458725782448
        );
	});
});


