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

exports.lib = {
  'and'             : and,
  'or'              : or,
  'not'             : not,
  'allCombinations' : allCombinations
};
