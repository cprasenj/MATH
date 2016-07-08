var _ = require('lodash');
var lib = require('./lib.js').lib;
Set = function() {
  this.elementsSet = lib.or(lib.and(arguments, _.flowRight(_.flatten, _.values)(arguments)), []);
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

  'equals' : function(that) {
    return lib.and(this.isSubset(that), that.isSubset(this));
  },

  'isProperSubset' : function(that) {
    return _.flowRight(Boolean, lib.and)(this.isSubset(that), lib.not(this.equals(that)));
  },

  'powerSet' : function() {
    var combinations = lib.allCombinations(this.elements());
    return combinations.map((aCombination) => new Set(aCombination));
  }
}
