var _ = require('lodash');
var lib = require('./lib.js').lib;

Set = function() {
  this.elementsSet = lib.or(lib.and(arguments, _.flowRight(_.uniq, _.flatten, _.values)(arguments)), []);
}

Set.prototype = {
  'elements' : function() {
    return this.elementsSet;
  },

  'add' : function(element) {
    this.elementsSet = _.flowRight(_.uniq, _.concat)(this.elementsSet, element);
    return element;
  },

  'isSubset' : function(that) {
    var thisElements = this.elements();
    var thatElements = that.elements();
    return thisElements.every((aValue) => _.includes(thatElements, aValue));
  },

  'isProperSubset' : function(that) {
    return _.flowRight(Boolean, lib.and)(this.isSubset(that), lib.not(this.equals(that)));
  },

  'powerSet' : function() {
    var combinations = lib.allCombinations(this.elements());
    return combinations.map((aCombination) => new Set(aCombination));
  },

  'cardinality' : function() {
    return this.elements().length;
  },

  'equals' : function(that) {
    return lib.and(this.isSubset(that), that.isSubset(this));
  },

  'isEmpty' : function() {
    return lib.not(this.cardinality());
  },

  'isUnit' : function() {
    return _.isEqual(this.cardinality(), 1);
  },

  'isPrimeSet' : function() {
    return this.elements().every((anElement) => lib.isPrime(anElement));
  },

  'isIntegerSet' : function() {
    return this.elements().every((anElement) => lib.isInteger(anElement));
  },

  'isNaturalSet' : function() {
    return this.elements().every((anElement) => _.flowRight(lib.gt0, lib.isInteger)(anElement));
  },

  'isPositiveSet' : function() {
    return _.every(this.elements(), lib.gt0);
  },

  'isNegativeSet' : function() {
    return _.every(this.elements(), lib.lt0);
  },

  'union' : function(that) {
    return new Set(_.union(this.elements(), that.elements()));
  }
}
