import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { eMult, eCompress } from '../../node/index.js';
import { isNonOverlappingAll } from '../../node/index.js';
import { isValid } from '../helpers/is-valid.js';


/**
 * 
 * @param e 
 * @param f 
 * @param expected 
 */
function check(e: number[], f: number[], expected: number[]) {
    assert(
        isNonOverlappingAll(e),
        'The first summand should not be an overlapping expansion.'
    );

    assert(
        isNonOverlappingAll(f),
        'The second summand should not be an overlapping expansion.'
    );


    let result = eMult(e,f);

    assert(
        isValid(result),
        'The result of expansionProduct should be a non-overlapping, non-adjacent expansion'
    );

    let result_ = eCompress(result);
    expect(result_).to.eql(expected);
}


describe('expansion product', function() {
	it('should calculate some expansion products correctly',
	function() {
        check(
            [-2.7755575615628914e-17, 0.30000000000000004],  // 0.3
            [-2.7755575615628914e-17, 0.30000000000000004],  // * 0.3
            [-5.55111512312578e-19, 0.09000000000000001]  // = 0.6
        );

        check(
            [1], // 1
            [2], // * 2
            [2]  // = 2
        );

        check(
            [0.1],   // 0.1
            [0.2],   // * 0.2
            [-1.6653345369377347e-18, 0.020000000000000004]  // = 0.2
        );

        check(
            [0.1e-90, 0.2e-70],
            [0.3e-89, 0.4e-68],
            [
                2.4120117070103274e-206,
                8.676625122982924e-190,
                -1.5833084720363327e-173,
                9.616851700788599e-157,
                7.999999999999999e-140
            ]
        );

        check(
            [0.1e-90, 0.2e-70],
            [0.3e-88, 0.4e-68],
            [
                -3.186153421448036e-206,
                -5.465088792534879e-190,
                -6.259983455672629e-173,
                9.622251700788599e-157,
                7.999999999999999e-140
            ]
        );

        check(
            [0.1e-100, 0.23e-80, 0.456e-60, 0.78e-40, 0.999e-20],
            [0.1e-100, 0.23e-80, 0.456e-60, 0.78e-40, 0.999e-20],
            [
                -6.729278451059032e-223,
                1.1369520915286784e-206,
                -2.032547882676228e-189,
                -1.1548801055927516e-172,
                3.137041190733804e-156,
                -5.643003527762757e-139,
                1.0178671475319507e-122,
                1.7881275147048415e-106,
                -1.5575151741423911e-89,
                -4.384654518988626e-73,
                -5.185314724355232e-57,
                9.980010000000001e-41
            ]
        );

        check(
            [0.1e-100, 0.23e-80, 0.456e-60, 0.78e-40, 0.999e-20],
            [0.1e-90, 0.23e-70, 0.456e-50, 0.78e-30, 0.999e-10],
            [
                -2.0248903589791595e-213,
                -2.165925235652991e-196,
                5.191142224400992e-180,
                1.2215732880724717e-163,
                -6.918034036704778e-147,
                3.161738436394082e-130,
                -6.270834473465668e-114,
                2.221833504035592e-97,
                5.898115714759413e-80,
                -2.0638676849941382e-63,
                -3.74664127610621e-47,
                9.98001e-31
            ]
        );
	});
});
