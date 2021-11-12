import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { expBitLength, eToBitlength, getLowestSetBit, exponent } from '../../src/index.js';


describe('expansion bit length', function() {
    it('should check expansion bit lengths correctly', 
    function() {
        expect(expBitLength([0])).to.eql(0);
        expect(expBitLength([1])).to.eql(1);
        expect(expBitLength([2])).to.eql(1);
        expect(expBitLength([65536])).to.eql(1);
        expect(expBitLength([1/65536])).to.eql(1);
        expect(expBitLength([65535])).to.eql(16);
        //expect(expBitLength([1.390671161567e-310])).to.eql(44);
        //expect(expBitLength([1.3906711615669e-310])).to.eql(42);
        let a: number[];

        a = [0.1, 1801439850948198.5];
        expect(expBitLength(a)).to.eql(106);
        //console.log(eToBitlength(a,105));
        //console.log(eToBitlength(a,106));
        //console.log(eToBitlength(a,107));

        a = [0.1, 2**3 * 1801439850948198.5];
        expect(expBitLength(a)).to.eql(109);

        a = [0.10000000000000002, 1801439850948198.5];
        expect(expBitLength(a)).to.eql(107);

        a = [0.09999999999999964, 1801439850948198.5];
        expect(expBitLength(a)).to.eql(100);

        a = [1, 2, 4, 8];
        expect(expBitLength(a)).to.eql(4);

        a = [15];
        expect(expBitLength(a)).to.eql(4);

        //console.log(eToBitlength(a,3)); // => 16
        //console.log(eToBitlength(a,4)); // => 15
        //console.log(eToBitlength(a,5)); // => 15
    });
});