var _ = require('lodash');

Set = function(initElements) {
  this.elementsSet = initElements || [];
}

Set.prototype = {
  'elements' : function() {
    return this.elementsSet;
  },

  'add' : function(element) {
    this.elementsSet = _.flowRight(_.uniq, _.concat)(this.elementsSet, element);
    return element;
  },

  'equals' : function(that) {
    return _.flowRight(_.isEmpty, _.intersection)(this.elements, that.elements);
  }
}
