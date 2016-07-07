var _ = require('lodash');
var SetWrapper = function() {
  this.elementsSet = [];
}

SetWrapper.prototype = {
  'elements' : function() {
    return this.elementsSet;
  },
  'add' : function(element) {
    this.elementsSet = _.concat(this.elementsSet, element);
    return element;
  }
}

exports.Set = function() {
    return new SetWrapper();
}
