var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
require('../src/set.js');

describe("SET", function() {

  describe("Set()", function() {
    it('set should add an element into it', function() {
      var set = new Set();
      set.add(1);
      expect(set.elements()).to.include.members([1]);
    });
    it('set should add an element into it', function() {
      var set = new Set();
      set.add(1);
      expect(set.elements()).to.include.members([1]);
      set.add(1);
      expect(set.elements()).to.have.length(1);
    });
    it('set1 should be a subset of set2 if and only if all the elements of set1 is present in set2', function() {
      var set1 = new Set(1);
      var set2 = new Set(1,2);
      var set3 = new Set();
      expect(set1.isSubset(set2)).to.be.true;
      expect(set3.isSubset(set2)).to.be.true;
      expect(set3.isSubset(set1)).to.be.true;
    });
    it('set should tell if it is equal to another set', function() {
      var set1 = new Set(1);
      var set2 = new Set(1,2);
      var set3 = new Set(1);
      expect(set1.equals(set3)).to.be.true;
      expect(set3.equals(set1)).to.be.true;
      expect(set2.equals(set1)).to.be.false;
      expect(set1.equals(set2)).to.be.false;
    });
    it('set1 is proper subset of set2 if set1 is a subset of set2 and they are not equal', function() {
      var set1 = new Set(1);
      var set2 = new Set(1,2);
      var set3 = new Set(1);
      expect(set1.isProperSubset(set2)).to.be.true;
      expect(set1.isProperSubset(set3)).to.be.false;
    });
    it('powerSet of set1 gives a set which contains all the set of combinations of set1', function() {
      var set1 = new Set(1,2);
      var actual = set1.powerSet();
      var expected = new Set(new Set(), new Set(1), new Set(1, 2));
      expected.elements().forEach((anExpected) => {
        var isSetPresent = actual.some((anActual) => {
          return anExpected.equals(anActual);
        });
        expect(isSetPresent).to.be.true;
      })
    });
    it('should give the cardinality of a set', function() {
      var set1 = new Set(1);
      var set3 = new Set(1, 2, 3);
      var set0 = new Set();
      assert.equal(set1.cardinality(), 1);
      assert.equal(set3.cardinality(), 3);
      assert.equal(set0.cardinality(), 0);
    });
    it('should give true if the set is empty else gives false', function() {
      var set0 = new Set();
      var set1 = new Set(1);
      expect(set0.isEmpty()).to.be.true;
      expect(set1.isEmpty()).to.be.false;
    });
    it('should give true if the set is unit else gives false', function() {
      var set0 = new Set();
      var set1 = new Set(1);
      expect(set0.isUnit()).to.be.false;
      expect(set1.isUnit()).to.be.true;
    });
    it('isPrimeSet should give true if the set is unit else gives false', function() {
      var set = new Set(2,3,5);
      var set1 = new Set(2,3,5,32416187567);
      var set2 = new Set(2,3,4);
      expect(set.isPrimeSet()).to.be.true;
      expect(set1.isPrimeSet()).to.be.true;
      expect(set2.isPrimeSet()).to.be.false;
    });
    it('isIntegerSet should tell all the elements in the set are integer or not', function() {
      var set = new Set(2,3,5);
      var set1 = new Set(2,3,5,32416187567);
      var set2 = new Set(2,3,5,32416187567.0);
      var set3 = new Set(2,3,-5,32416187567.0);
      var set4 = new Set(2,3.8,-5,32416187567.0);
      expect(set.isIntegerSet()).to.be.true;
      expect(set1.isIntegerSet()).to.be.true;
      expect(set2.isIntegerSet()).to.be.true;
      expect(set3.isIntegerSet()).to.be.true;
      expect(set4.isIntegerSet()).to.be.false;
      expect(new Set().isIntegerSet()).to.be.true;
    });
  });

});
