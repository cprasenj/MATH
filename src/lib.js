var lib = {};
var _ = require('lodash');

var and = function(first, second) {
  return first && second;
}

var or = function(first, second) {
  return first || second;
}

var not = function(val) {
  return !val;
}

var remainder = function(one, another) {
  return one % another;
}

var allCombinations = function combinations(list) {
    var combinator = function(active, rest, bucket) {
        if (and(not(active.length), not(rest.length)))
            return [];
        if (not(rest.length)) {
            bucket.push(_.compact(_.flattenDeep(active)));
        } else {
            combinator([active, _.head(rest)], _.tail(rest), bucket);
            combinator([active], _.tail(rest), bucket);
        }
        return bucket;
    }
    return combinator("", list, []);
}

var add1 = _.partial(_.add, 1);
var add2 = _.partial(_.add, 2);
var sub1 = _.partialRight(_.subtract, 1);
var divideBy2 = _.partial(_.divide, 2);
var gt0 = _.partialRight(_.gt, 0);
var lt0 = _.partialRight(_.lt, 0);

var successor = function(number) {
  return add1(number);
}

var predessor = function(number) {
  return sub1(number);
}

var isPrime = function(number) {
  var limit = _.flowRight(add1, Math.sqrt)(number);
  if(_.lte(number, 3)) return true;
  return _.range(2, limit).every((aValueInRange) => remainder(number, aValueInRange));
}

var isInteger = function(number) {
  return number == parseInt(number, 10);
}

exports.lib = {
  'and'             : and,
  'or'              : or,
  'not'             : not,
  'allCombinations' : allCombinations,
  'isPrime'         : isPrime,
  'isInteger'       : isInteger,
  'gt0'             : gt0,
  'lt0'             : lt0
};
