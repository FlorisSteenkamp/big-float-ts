import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { split, eEstimate, eCalculate } from '../../node/index.js';
import { isValid } from '../helpers/is-valid.js';


function check(sum: number[][][], res: number) {
    let result = eCalculate(sum);

    for (let term of sum) {
        for (let multiplicant of term) {
            assert(
                isValid(multiplicant),
                'The first summand should not be an overlapping expansion.'
            );
        }
    }

    expect(eEstimate(result)).to.eql(res);
}


describe('eCalculate', function() {
	it('should calculate correctly',
	function() {
        // zero should equal 0
        check(
            [[[2**-8, 2**-4, 1]]],
            1.06640625
        );

        // zero should equal 0
        check(
            [[[0]]],
            0
        );

        // zero times zero is still zero
        check(
            [[[0],[0]]],
            0
        );

        // zero times zero add zero is again still zero
        check(
            [[[0],[0]], [[0]]],
            0
        );

        // two times 3 plus 4 = 10
        check(
            [[[2],[3]], [[4]]],
            10
        );

        // 0.1 + 0.2 === 0.3ish
        check(
            [[[0.1]], [[0.2]]],
            0.30000000000000004
        );

        // 0.1*0.2*100 + 1*2*3*4 + 3*2*1 = 32
        check(
            [[[0.1],[0.2],[100]], [[1],[2],[3],[4]], [[3],[2],[1]]],
            32
        );

        // 1*2*3 + 1*2*3*4 + 3*2*1 = 36
        check(
            [[[1],[2],[3]], [[1],[2],[3],[4]], [[3],[2],[1]]],
            36
        );

        // some complicated sum
        // 0.123421*0.1*0.2342234 + 
        // 0.23345554*2.123123*3.76564*4.3462346 + 
        // 3.2354123*2.1231232*1.123456789 = 15.83217927367012458725782448
        check(
            [[[0.123421],[0.1],[0.2342234]], 
            [[0.23345554],[2.123123],[3.76564],[4.3462346]], 
            [[3.2354123],[2.1231232],[1.123456789]]],
            15.83217927367012458725782448
        );

        // some more complicated sum
        // 0.123421*0.1*0.2342234 + 
        // 0.23345554*2.123123*3.76564*4.3462346 + 
        // 3.2354123*2.1231232*1.123456789 = 15.83217927367012458725782448
        check(
            [
                [split(0.123421).reverse(), split(0.1).reverse(), split(0.2342234).reverse()], 
                [split(0.23345554).reverse(), split(2.123123).reverse(), split(3.76564).reverse(), split(4.3462346).reverse()], 
                [split(3.2354123).reverse(), split(2.1231232).reverse(), split(1.123456789).reverse()]
            ],
            15.83217927367012458725782448
        );

        // zero should equal 0
        check(
            [[
                [1], [2**-8, 2**-4, 1]
            ]],
            1.06640625
        );
	});
});


