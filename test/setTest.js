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
    it('set should tell if it is equal to another set', function() {
      var set1 = new Set(1);
      var set2 = new Set(1);
      expect(set1.equals(set2)).to.be.true;
    });
  })
});
