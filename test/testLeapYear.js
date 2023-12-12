// Extern import
import { expect } from "chai";

// Intern import
import { isLeap } from "../src/leapYear.js";

describe('test Leap Year incorrect calls', () => {
    it('missing parameter must throw', () => {
        expect(()=> isLeap()).to.throw()
    })
    it('null parameter must throw', () => {
        expect(()=> isLeap(null)).to.throw()
    })
    it('non-number parameter must throw (string)', () => {
        expect(()=> isLeap("bad")).to.throw()
    })
    it('non-number parameter must throw (bool)', () => {
        expect(()=> isLeap(true)).to.throw()
    })
    it('non-number parameter must throw (object)', () => {
        expect(()=> isLeap({bad})).to.throw()
    })
    it('non-number parameter must throw (array)', () => {
        expect(()=> isLeap(["bad"])).to.throw()
    })
    it('non-int year parameter must throw', () => {
        expect(()=> isLeap(2000.6)).to.throw()
    })
    it('pre-gregorian year parameter must throw', () => {
        expect(()=> isLeap(1581)).to.throw()
    })
})

describe('test Leap Year', () => {
    it('1900 is not leap', () => {
        expect(isLeap(1900)).to.equal(false);
    });
    
    it('2008 is leap', () => {
        expect(isLeap(2008)).to.equal(true);
    });

    it('2018 is not leap', () => {
        expect(isLeap(2018)).to.equal(false);
    });
    
    it('2000 is leap', () => {
        expect(isLeap(2000)).to.equal(true);
    });

    it('2020 is leap', () => {
        expect(isLeap(2020)).to.equal(true);
    });
});