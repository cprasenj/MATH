var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
require('../src/set.js');

describe("SET", function() {

  describe('add', function() {
    it('adds an element into the set', function() {
      var set = new Set();
      set.add(1);
      expect(set.elements()).to.include.members([1]);
    });
    it('dose not add if the element is already present in the set', function() {
      var set = new Set();
      set.add(1);
      expect(set.elements()).to.include.members([1]);
      set.add(1);
      expect(set.elements()).to.have.length(1);
    });
  });

  describe('isSubset', function() {
    it('gives true for {1} and {1, 2}', function() {
      var set1 = new Set(1);
      var set2 = new Set(1,2);
      expect(set1.isSubset(set2)).to.be.true;
    });
    it('gives true for empty set and any set', function() {
      var emptySet = new Set();
      var set1 = new Set(1);
      var set2 = new Set(1,2);
      expect(emptySet.isSubset(set1)).to.be.true;
      expect(emptySet.isSubset(set2)).to.be.true;
    });
  });
  describe('equals', function() {
    it('gives true for {1} and {1}', function() {
      var set1 = new Set(1);
      var set2 = new Set(1);
      expect(set1.equals(set2)).to.be.true;
      expect(set2.equals(set1)).to.be.true;
    });
    it('gives false  for {1} and {1, 2}', function() {
      var set1 = new Set(1);
      var set2 = new Set(1,2);
      expect(set2.equals(set1)).to.be.false;
      expect(set1.equals(set2)).to.be.false;
    });
  });

  describe('isProperSubset', function() {
    it('gives false for {1} and {1}', function() {
      var set1 = new Set(1);
      var set2 = new Set(1);
      expect(set1.isProperSubset(set2)).to.be.false;
      expect(set2.isProperSubset(set1)).to.be.false;
    });
    it('gives true for {1} and {1, 2}', function() {
      var set1 = new Set(1);
      var set2 = new Set(1,2);
      expect(set1.isProperSubset(set2)).to.be.true;
    });
  });

  describe('powerSet', function() {
    it('gives {{}, {1}, {1, 2}} for {1, 2}', function() {
      var set1 = new Set(1,2);
      var actual = set1.powerSet();
      var expected = new Set(new Set(), new Set(1), new Set(1, 2));
      expected.elements().forEach((anExpected) => {
        var isSetPresent = actual.elements().some((anActual) => {
          return anExpected.equals(anActual);
        });
        expect(isSetPresent).to.be.true;
      });
    });
    it('gives {} for {}', function() {
      var set = new Set();
      expect(set.powerSet().equals(new Set())).to.be.true;
    });
  });

  describe('cardinality', function() {
    it('gives 4 for {1, 2, 3, 1, 2, 3}', function() {
      var set = new Set(1, 2, 3, 1, 2, 3);
      assert.equal(set.cardinality(), 3);
    });
    it('gives 1 for {1}', function() {
      var set1 = new Set(1);
      assert.equal(set1.cardinality(), 1);
    });
    it('gives 3 for {1, 2, 3}', function() {
      var set3 = new Set(1, 2, 3);
      assert.equal(set3.cardinality(), 3);
    });
    it('gives 0 for {}', function() {
      var set0 = new Set();
      assert.equal(set0.cardinality(), 0);
    });
  });

  describe('isEmpty', function() {
    it('gives true if the set is empty', function() {
      var set0 = new Set();
      expect(set0.isEmpty()).to.be.true;
    });
    it('gives false if the set is not empty', function() {
      var set1 = new Set(1);
      var set2 = new Set(new Set());
      expect(set1.isEmpty()).to.be.false;
      expect(set2.isEmpty()).to.be.false;
    });
  });

  describe('isUnit', function() {
    it('gives true for {}', function() {
      var set1 = new Set(1);
      expect(set1.isUnit()).to.be.true;
    });
    it('gives false for {}, and {1, 2}', function() {
      var set0 = new Set();
      var set1 = new Set(1, 2);
      expect(set0.isUnit()).to.be.false;
      expect(set1.isUnit()).to.be.false;
    });
  });

  describe('isPrimeSet', function() {
    it('gives true for {2, 3, 5}', function() {
      var set = new Set(2, 3, 5);
      expect(set.isPrimeSet()).to.be.true;
    });
    it('gives true for {2, 3, 5, 32416187567}', function() {
      var set = new Set(2,3,5,32416187567);
      expect(set.isPrimeSet()).to.be.true;
    });
    it('gives false for {2, 3, 4}', function() {
      var set = new Set(2, 3, 4);
      expect(set.isPrimeSet()).to.be.false;
    });
  });

  describe('isIntegerSet', function() {
    it('gives true for {2, 3, 5}', function() {
      var set = new Set(2, 3, 5);
      expect(set.isIntegerSet()).to.be.true;
    });
    it('gives true for {2, 3, 5, 32416187567}', function() {
      var set = new Set(2,3,5,32416187567);
      expect(set.isIntegerSet()).to.be.true;
    });
    it('gives true for {2, 3, 5, 32416187567.0}', function() {
      var set = new Set(2, 3, 5, 32416187567.0);
      expect(set.isIntegerSet()).to.be.true;
    });
    it('gives true for {2, 3, -5, 32416187567.0}', function() {
      var set = new Set(2, 3, -5, 32416187567.0);
      expect(set.isIntegerSet()).to.be.true;
    });
    it('gives false for {2, 3.8, -5, 32416187567.0}', function() {
      var set = new Set(2, 3.8, -5, 32416187567.0);
      expect(set.isIntegerSet()).to.be.false;
    });
    it('gives true for {}', function() {
      expect(new Set().isIntegerSet()).to.be.true;
    });
  });

  describe('isPositiveSet', function() {
    it('gives true for {2, 3, 5}', function() {
      var set = new Set(2, 3, 5);
      expect(set.isPositiveSet()).to.be.true;
    });
    it('gives false for {-2, 3, 5, 32416187567}', function() {
      var set = new Set(-2, 3, 5, 32416187567);
      expect(set.isPositiveSet()).to.be.false;
    });
  });

  describe('isNegativeSet', function() {
    it('gives true for {-2, -3 ,-5}', function() {
      var set = new Set(-2, -3 ,-5);
      expect(set.isNegativeSet()).to.be.true;
    });
    it('gives false for {2, 3, 5, 32416187567}', function() {
      var set = new Set(2, 3, 5, 32416187567);
      expect(set.isNegativeSet()).to.be.false;
    });
  });

  describe('union', function() {
    it('gives {1, 2, 3} for {1, 2}, {2, 3}', function() {
      var set = new Set(1, 2);
      var set1 = new Set(2, 3);
      var set2 = new Set(1, 2, 3);
      expect((set.union(set1)).equals(set2)).to.be.true;
    });
    it('gives {1, 2, 3} for {1, 2}, {1, 2, 3}', function() {
      var set = new Set(1, 2);
      var set1 = new Set(1, 2, 3);
      expect((set.union(set1)).equals(set1)).to.be.true;
    });
  });

  describe('intersection', function() {
    it('gives {2} for {1, 2} and {2, 3}', function() {
      var set = new Set(1, 2);
      var set1 = new Set(2, 3);
      var set2 = new Set(2);
      expect((set.intersection(set1)).equals(set2)).to.be.true;
    });
    it('gives {} for {1, 2} and {}', function() {
      var set = new Set(1, 2);
      var set1 = new Set();
      expect((set.intersection(set1)).equals(new Set())).to.be.true;
    });
  });

  describe('subtract', function() {
    it('gives {1} for {1, 2} and {2, 3}', function() {
      var set = new Set(1, 2);
      var set1 = new Set(2, 3);
      var set2 = new Set(1);
      expect((set.subtract(set1)).equals(set2)).to.be.true;
    });
    it('subtract of set2 from set1 and set1 from set2 are not same', function() {
      var set1 = new Set(1, 2);
      var set2 = new Set(2, 3);
      expect((set1.subtract(set2)).equals(set2.subtract(set1))).to.be.false;
    });
    it('gives {3} for {2, 3} and {1, 2}', function() {
      var set1 = new Set(1, 2);
      var set2 = new Set(2, 3);
      var set3 = new Set(3);
      expect((set2.subtract(set1)).equals(set3)).to.be.true;
    });
  });

  describe('cartesianProduct', function() {
    it('gives [[1, 2], [1, 3], [2, 2], [2, 3]] for {1, 2} and {2, 3}', function() {
      var set1 = new Set(1, 2);
      var set2 = new Set(2, 3);
      var productSet = new Set([[1, 2], [1, 3], [2, 2], [2, 3]]);
      expect((set1.cartesianProduct(set2)).equals(productSet)).to.be.true;
    });
    it('gives {} for any set and {}', function() {
      var set1 = new Set(1, 2);
      var set2 = new Set(2, 3);
      var set3 = new Set();
      expect((set1.cartesianProduct(set3)).equals(new Set())).to.be.true;
      expect((set2.cartesianProduct(set3)).equals(new Set())).to.be.true;
    });
    it('A × (B ∪ C) = (A × B) ∪ (A × C)', function() {
      var set = new Set(1, 2);
      var set1 = new Set(2, 3);
      var set3 = new Set();
      var set4 = new Set(4, 5);
      expect((set.cartesianProduct(set3.union(set4))).equals((set.cartesianProduct(set3)).union(set.cartesianProduct(set4)))).to.be.true;
    });
  });
});
