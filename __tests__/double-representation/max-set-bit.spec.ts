import { describe, expect, it } from '@jest/globals';
import { getHighestSetBit } from '../../src/double-representation/get-highest-set-bit.js';
import { getLowestSetBit } from '../../src/double-representation/get-lowest-set-bit.js';
import { parseDouble } from '../../src/double-representation/parse-double.js';
import { exponent } from '../../src/double-representation/exponent.js';


/** Reference: the significand (incl. hidden bit) as a binary string, msb first */
function sigBits(a: number) {
    return parseDouble(a).significand
        .map((byte, i) => byte.toString(2).padStart(i === 0 ? 5 : 8, '0'))
        .join('');  // 53 bits
}


describe('max set bits', function() {
    it('should check highest set bit is given correctly', 
    function() {
        expect(getHighestSetBit(1/65536)).toEqual(52);
        expect(getHighestSetBit(0)).toEqual(NaN);
        expect(getHighestSetBit(1.390671161567e-310)).toEqual(44);
        expect(getHighestSetBit(5e-324)).toEqual(0);
        expect(getHighestSetBit(1e-323)).toEqual(1);
        expect(getHighestSetBit(0.1)).toEqual(52);
        expect(getHighestSetBit(123123)).toEqual(52);
        expect(getHighestSetBit(0.0322123123)).toEqual(52);
        expect(getHighestSetBit(1.335044315104321e-308)).toEqual(51);
    });

    it('should check lowest set bit is given correctly', 
    function() {
        expect(getLowestSetBit(1/65536)).toEqual(52);
        expect(getLowestSetBit(0)).toEqual(NaN);
        expect(getLowestSetBit(1.390671161567e-310)).toEqual(1);
        expect(getLowestSetBit(1.3906711614456e-310)).toEqual(12);
        expect(getLowestSetBit(2.238980570121657e-308)).toEqual(12);
        expect(getLowestSetBit(2.2389805701196335e-308)).toEqual(15);
        expect(getLowestSetBit(0.2515624999996362)).toEqual(15);
        expect(getLowestSetBit(5e-324)).toEqual(0);
        expect(getLowestSetBit(1e-323)).toEqual(1);
    });

    it('should agree with a byte-wise reference for normal and subnormal doubles', 
    function() {
        const values: number[] = [1, -1, 0.5, 3, 2**52 + 1, 2**53 - 1, 2**-1022, 2**-1074, 
            Number.MAX_VALUE, -Number.MIN_VALUE, 2**32, 2**31, 2**-1050 * 3];
        for (let i=0; i<2000; i++) {
            const m = Math.random() * 2**Math.floor(Math.random()*53);
            values.push(m * 2**(Math.floor(Math.random()*2100) - 1100));
        }

        for (const a of values) {
            if (a === 0 || !Number.isFinite(a)) { continue; }
            const bits = sigBits(a);
            expect(getHighestSetBit(a)).toEqual(52 - bits.indexOf('1'));
            expect(getLowestSetBit(a)).toEqual(52 - bits.lastIndexOf('1'));
            expect(exponent(a)).toEqual(parseDouble(a).exponent);
        }
    });
});