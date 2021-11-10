/*
import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { eCompare, fastExpansionSum } from '../../node/index.js';
import { expansionSum } from '../../node/double-expansion/expansion-sum.js';
import { isNonOverlappingAll } from '../../node/index.js';;
import { isValid } from '../helpers/is-valid.js';


/**
 * 
 * @param {number[]} e 
 * @param {number[]} f 
 * @param {number[]} res 
 *//*
function check(e, f, res) {
    assert(
        isNonOverlappingAll(e),
        'The first summand should not be an overlapping expansion.'
    );

    assert(
        isNonOverlappingAll(f),
        'The second summand should not be an overlapping expansion.'
    );


    let resultA = expansionSum(e,f);

    assert(
        isValid(resultA),
        'The result of expansionSum should be a non-overlapping, non-adjacent expansion'
    );


    let resultB = fastExpansionSum(e,f);
    let cmp = eCompare(resultA, resultB);

    assert(
        cmp === 0,
        `expansionSum and fastExpansionSum should return identical results - they don't\n;
         fastEpansionSum: ${resultB} - expansionSum: ${resultA}`
    )
}


describe('expansion sum', function() {
	it('should calculate some expansion sums correctly',
	function() {
        
        check(
            [-2.7755575615628914e-17, 0.30000000000000004],  // 0.3
            [-2.7755575615628914e-17, 0.30000000000000004],  // + 0.3
            [-5.551115123125783e-17, 0.6000000000000001]  // = 0.6
        );

        check(
            [1],   // 1
            [2],   // + 2
            [3]  // = 3
        );
        
        check(
            [0.1],   // 0.1
            [0.2],   // + 0.2
            [-2.7755575615628914e-17, 0.30000000000000004]  // = 0.3
        );

        check(
            [0.1e-90, 0.2e-70],
            [0.3e-89, 0.4e-68],
            [
                6.812735744013041e-107,
                3.1e-90,
                -2.1716258580568247e-85,
                4.02e-69
            ]
        );

        check(
            [0.1e-90, 0.2e-70],
            [0.3e-88, 0.4e-68],
            [
                -3.678877301767042e-106,
                3.01e-89,
                -2.1716258580568247e-85,
                4.02e-69
            ]
        );

        check(
            [0.1e-100, 0.23e-80, 0.456e-60, 0.78e-40, 0.999e-20],
            [0.1e-100, 0.23e-80, 0.456e-60, 0.78e-40, 0.999e-20],
            [2e-101, 0, 4.6e-81, 0, 9.12e-61, 0, 1.56e-40, 0, 1.998e-20]
        );

        check(
            [0.1e-100, 0.23e-80, 0.456e-60, 0.78e-40, 0.999e-20],
            [0.1e-90, 0.23e-70, 0.456e-50, 0.78e-30, 0.999e-10],
            [
                -6.034492101807179e-108,
                -1.3875858987879488e-97,
                -1.1184029171647343e-87,
                1.772767559313363e-77,
                2.848982182572856e-67,
                5.08454808684856e-57,
                -3.8509382198042257e-47,
                -1.2276606139947577e-37,
                -2.428690697334946e-27,
                9.990000000999e-11]    
        );
	});
});
*/