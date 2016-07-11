var l = require('../src/lib.js').lib;
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

describe('lib', function() {
  it('isPrime gives true if the number is prime', function() {
    expect(l.isPrime(2)).to.be.true;
    expect(l.isPrime(3)).to.be.true;
    expect(l.isPrime(4)).to.be.false;
    expect(l.isPrime(5)).to.be.true;
    expect(l.isPrime(6)).to.be.false;
    expect(l.isPrime(32416187567)).to.be.true;
  })
})
