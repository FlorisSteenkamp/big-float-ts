import { describe, expect, it } from '@jest/globals';
import { isOverlapping } from '../../src/double-expansion/is-overlapping';


describe('is overlapping', function() {
    it('should check if two numbers overlap correctly', 
    function() {
        {
            let a = 0.1;
            let b = 0.2;
            expect(isOverlapping(a,b)).toEqual(true);
        }

        {
            let a = 1;
            let b = 2;
            expect(isOverlapping(a,b)).toEqual(false);
        }

        {
            let a = 2;
            let b = 3.999999;
            expect(isOverlapping(a,b)).toEqual(true);
        }
        
        {
            let a = 8.881784197001252e-16; // === 2^-50
            let b = 29.120258510868776; // === 1.23456**16
            
            expect(isOverlapping(a,b)).toEqual(false);
        }
    });
});