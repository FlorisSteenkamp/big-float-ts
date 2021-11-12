
import { expect } from 'chai';
import { describe } from 'mocha';

import { eToBitlength, eCompress } from '../../src/index.js';


describe('to bit length', function() {
	it('should set the bit length of some doubles correctly', 
	function() {
        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 56);
            expect(res).to.eql([-8.526512829121202e-14, 1341.0000297837585]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 55);
            expect(res).to.eql([-1.1368683772161603e-13, 1341.0000297837585]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 54);
            expect(res).to.eql([-1.1368683772161603e-13, 1341.0000297837585]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 54);
            expect(res).to.eql([-1.1368683772161603e-13, 1341.0000297837585]);
        }
        
        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 53);
            expect(res).to.eql([1341.0000297837585]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 32);
            expect(res).to.eql([1341.0000295639038]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 28);
            expect(res).to.eql([1341.0000305175781]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 25);
            expect(res).to.eql([1341]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 26);
            expect(res).to.eql([1341.0000305175781]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 10);
            expect(res).to.eql([1342]);
        }

        {
            let a = eCompress([134134123111*(2**-52), 1341]);
            let res = eToBitlength(a, 4);
            expect(res).to.eql([1280]);
        }
        
        {
            let a = [1341];
            let res = eToBitlength(a, 4);
            expect(res).to.eql([1280]);
        }

        {
            let a = [134134123111*(2**-52), 1341];
            let res = eToBitlength(a, 4);
            expect(res).to.eql([1280]);
        }
	});
});
