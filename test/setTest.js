var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var Set = require('../src/set.js').Set;

describe("SET", function() {
  describe("Set()", function() {
    it('should create a Set object', function() {
      var set = new Set();
      set.add(1);
      expect(set.elements()).to.include.members([1]);
    })
  })
});
