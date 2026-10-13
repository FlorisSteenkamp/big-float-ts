import { describe, expect, it } from '@jest/globals';
import { eToBitlength } from '../../src/double-expansion/e-to-bitlength.js';
import { eCompress } from '../../src/double-expansion/e-compress.js';


describe('to bit length', function() {
    it('should set the bit length of some doubles correctly', 
    function() {
        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 56);
            expect(res).toEqual([-8.526512829121202e-14, 1341.0000297837585]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 55);
            expect(res).toEqual([-1.1368683772161603e-13, 1341.0000297837585]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 54);
            expect(res).toEqual([-1.1368683772161603e-13, 1341.0000297837585]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 54);
            expect(res).toEqual([-1.1368683772161603e-13, 1341.0000297837585]);
        }
        
        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 53);
            expect(res).toEqual([1341.0000297837585]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 32);
            expect(res).toEqual([1341.0000295639038]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 28);
            expect(res).toEqual([1341.0000305175781]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 25);
            expect(res).toEqual([1341]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 26);
            expect(res).toEqual([1341.0000305175781]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 10);
            expect(res).toEqual([1342]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 4);
            expect(res).toEqual([1280]);
        }
        
        {
            let a = [1341];
            let res = eToBitlength(a, 4);
            expect(res).toEqual([1280]);
        }

        {
            let a = [134134123111*(2**-52), 1341];
            let res = eToBitlength(a, 4);
            expect(res).toEqual([1280]);
        }
    });

    it('should round a component lying just below the kept bits to 0 or a power of 2',
    function() {
        // keep bits 60..1 of 2^60 + 1: exact tie => round to even (i.e. drop the 1)
        expect(eToBitlength([1, 2**60], 60)).toEqual([2**60]);
        expect(eToBitlength([-1, 2**60], 60)).toEqual([2**60]);

        // keep bits 60..1 of 2^60 + 1.5: above the tie => round up to 2
        expect(eToBitlength([1.5, 2**60], 60)).toEqual([2, 2**60]);
        expect(eToBitlength([-1.5, 2**60], 60)).toEqual([-2, 2**60]);

        // tie broken by a lower component of the same sign => round up to 2
        expect(eToBitlength([2**-10, 1, 2**70], 70)).toEqual([2, 2**70]);
        // tie broken by a lower component of opposite sign => round down to 0
        expect(eToBitlength([-(2**-10), 1, 2**70], 70)).toEqual([2**70]);
    });
});
