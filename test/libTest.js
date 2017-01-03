var l = require('../src/lib.js').lib;
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

describe('lib', function() {

  describe('and', function() {
    it('gives true for true and true', function() {
      expect(l.and(true, true)).to.be.true;
    });
    it('gives true for 1 and true', function() {
      expect(l.and(1, true)).to.be.true;
    });
    it('gives true for "hello" and true', function() {
      expect(l.and('hello', true)).to.be.true;
    });
    it('gives true for [] and true', function() {
      expect(l.and([], true)).to.be.true;
    });
    it('gives true for {} and true', function() {
      expect(l.and({}, true)).to.be.true;
    });
  });

  describe('or', function() {
    it('gives true for true and true', function() {
      expect(l.or(true, true)).to.be.true;
    });
    it('gives 1 for 1 and true', function() {
      assert.equal(l.or(1, true), 1);
    });
    it('gives "hello" for "hello" and true', function() {
      assert.equal(l.or('hello', true), 'hello');
    });
    it('gives [] for [] and true', function() {
      assert.deepEqual(l.or([], true), []);
    });
    it('gives {} for {} and true', function() {
      assert.deepEqual(l.or({}, true), {});
    });
  });

  describe('not', function() {
    it('gives true false', function() {
      expect(l.not(false)).to.be.true;
    });
    it('gives false for true', function() {
      expect(l.not(true)).to.be.false;
    });
    it('gives false for "hello" and true', function() {
      expect(l.not('hello')).to.be.false;
    });
    it('gives false for [] and true', function() {
      expect(l.not([])).to.be.false;
    });
    it('gives true for {} and true', function() {
      expect(l.not({})).to.be.false;
    });
  });

  describe('remainder', function() {
    it('gives 0 for 1 and 1', function() {
      assert.equal(l.remainder(1, 1), 0);
    });
    it('gives 5 for 11 and 6', function() {
      assert.equal(l.remainder(11, 6), 5);
    });
    it('gives 9 for 9 and 11', function() {
      assert.equal(l.remainder(9, 11), 9);
    });
    it('gives 9 for -9 and 11', function() {
      assert.equal(l.remainder(-9, 11), -9);
    });
    it('gives 9 for 9 and -11', function() {
      assert.equal(l.remainder(9, -11), 9);
    });
    it('gives NaN for 0 and 0', function() {
      assert.deepEqual(l.remainder(0, 0), NaN);
    });
    it('gives NaN for {} and []', function() {
      assert.deepEqual(l.remainder({}, []), NaN);
    });
  });

  describe('isPrime', function() {
    it('gives true for 2', function() {
      expect(l.isPrime(2)).to.be.true;
    });
    it('gives true for 3', function() {
      expect(l.isPrime(3)).to.be.true;
    });
    it('gives false for 4', function() {
      expect(l.isPrime(4)).to.be.false;
    });
    it('gives true for 5', function() {
      expect(l.isPrime(5)).to.be.true;
    });
    it('gives false for 6', function() {
      expect(l.isPrime(6)).to.be.false;
    });
    it('gives true for 32416187567', function() {
      // expect(l.isPrime(32416187567)).to.be.true;
    });
  })
})
