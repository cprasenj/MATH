const util = require('util');
const _ = require('lodash');
const l = require('./lib.js').lib;

ComplexNumber = function(real, imaginary) {
  this.real = l.or(real, 0);
  this.imaginary = l.or(imaginary, 0);
}

ComplexNumber.prototype = {
  'toString' : function() {
    return util.format("%s%s", this.real, _.gt(this.imaginary, 0) ?
                        util.format("%s%s", '+i', this.imaginary) : util.format("%s%s", '-i', this.imaginary));
  },
  'equals' : function(that) {
    return l.and(_.eq(this.real, that.real), _.eq(this.imaginary, that.imaginary));
  },
  'newInstance' : function(real, imaginary) {
    return new ComplexNumber(real, imaginary);
  },
  'conjugate' : function() {
    return this.newInstance(this.real, l.negate(this.imaginary));
  },
  'add' : function(that) {
    return this.newInstance(_.add(this.real, that.real), _.add(this.imaginary, that.imaginary));
  },
  'subtract' : function(that) {
    return this.newInstance(_.subtract(this.real, that.real), _.subtract(this.imaginary, that.imaginary));
  },
  'multiplication' : function(that) {
    return this.newInstance(
      _.subtract(_.multiply(this.real, that.real), _.multiply(this.imaginary, that.imaginary)),
      _.add(_.multiply(this.imaginary, that.real), _.multiply(this.real, that.imaginary))
    )
  },
  'division' : function() {
    // have to implemented
  },
  'reciprocal' : function() {
    // have to implemented
  },
  'sqrt' : function() {
    // have to implemented
  },
  'abs' : function() {
    return _.flowRight(Math.sqrt, _.add)(_.multiply(this.real, this.real), _.multiply(this.imaginary, this.imaginary));
  }
}
