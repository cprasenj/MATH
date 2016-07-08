var lib = {};
var _ = require('lodash');
lib.and = function(first, second) {
  return first && second;
}

lib.or = function(first, second) {
  return first || second;
}

lib.not = function(val) {
  return !val;
}

lib.allCombinations = function combinations(list) {
    var combinator = function(active, rest, bucket) {
        if (!active.length && !rest.length)
            return [];
        if (!rest.length) {
            bucket.push(_.compact(_.flattenDeep(active)));
        } else {
            combinator([active, _.head(rest)], _.tail(rest), bucket);
            combinator([active], _.tail(rest), bucket);
        }
        return bucket;
    }
    return combinator("", list, []);
}

exports.lib = lib;
