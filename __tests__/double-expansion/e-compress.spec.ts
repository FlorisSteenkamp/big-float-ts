import { describe, expect, it } from '@jest/globals';
import { eCompress } from '../../src/double-expansion/e-compress.js';
import { isNonOverlappingAll } from '../../src/double-expansion/is-overlapping.js';
import { isValid } from '../helpers/is-valid.js';


/**
 * 
 * @param e 
 * @param eCompressed 
 */
function check(
        e: number[],
        eCompressed: number[]) {

    const r = eCompress(e);

    expect(isNonOverlappingAll(e)).toEqual(true);
    expect(isValid(r)).toEqual(true);
    // r;//?

    expect(r).toEqual(eCompressed);
}


describe('`eCompress`', function() {
    it('should correctly eCompress some Shewchuk floating point number expansions', 
    function() {
        check([1, 2, 4, 8], [15]);

        check(
            [0, 0, -5.551115123125783e-17, 0.6000000000000001],
            [-5.551115123125783e-17, 0.6000000000000001]
        );

        check([0,3], [3]);

        check(
            [0, 2e-101, 0, 4.6e-81, 0, 9.12e-61, 0, 1.56e-40, 0, 1.998e-20],
            [2e-101, 4.6e-81, 9.12e-61, 1.56e-40, 1.998e-20]
        );

        check(
            [
                4.254194533776921e-66,
                5.978697029623362e-49,
                6.1463762719925316e-33,
                9.810664135728976e-17,
                1
            ],
            [
                4.254194533776921e-66,
                -8.635806282126587e-50,
                6.146376271992532e-33,
                9.810664135728976e-17,
                1
            ]
        )
    });
});
