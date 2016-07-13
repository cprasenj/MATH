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
    return this.elements().every((thisElement) =>
      _.some(that.elements(), _.partial(_.isEqual, thisElement))
    )
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
    return _.every(this.elements(), lib.isPrime);
  },

  'isIntegerSet' : function() {
    return _.every(this.elements(), lib.isInteger);
  },

  'isNaturalSet' : function() {
    return _.every(this.elements(), _.flowRight(lib.gt0, lib.isInteger));
  },

  'isPositiveSet' : function() {
    return _.every(this.elements(), lib.gt0);
  },

  'isNegativeSet' : function() {
    return _.every(this.elements(), lib.lt0);
  },

  'union' : function(that) {
    return new Set(_.union(this.elements(), that.elements()));
  },

  'intersection' : function(that) {
    return new Set(_.intersection(this.elements(), that.elements()));
  },

  'subtract' : function(that) {
    var subtrcted = this.elements();
    that.elements().forEach((element) => {
      subtrcted = _.without(subtrcted, element);
    });
    return new Set(subtrcted);
  },

  'cartesianProduct' : function(that) {
    var allProducts = this.elements().map((element1) =>
                            that.elements().map((element2) =>
                                [element1, element2])
                              );
    return new Set(_.flatten(allProducts));
  }
}
