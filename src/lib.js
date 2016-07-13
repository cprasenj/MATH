var lib = {};
var _ = require('lodash');

var and = (first, second) => first && second;

var or = (first, second) => first || second;

var not = (val) => !val;

var remainder = (one, another) => one % another;

var allCombinations = (list) => {
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
var sub1 = _.partialRight(_.subtract, 1);

var successor = (number) => add1(number);

var predessor = (number) => sub1(number);

var isPrime = (number) =>
  or(_.lte(number, 3), _.every(_.range(2, _.flowRight(add1, Math.sqrt)(number))
  , _.partial(remainder, number)
  )
);

var isInteger = (number) => _.eq(number, parseInt(number, 10));

var sortedJoin = (list) => list.sort().join('');

var evalNestedValue = (object, keys) => or(keys.reduce((nextObject, key) =>
  not(nextObject) ? nextObject : nextObject[key]
, object), []);

var subSet = (oneStateSet, aNotherStateSet) =>
  and(
    _.gt(aNotherStateSet.length, 0),
    _.every(aNotherStateSet, _.partial(_.includes, oneStateSet))
  );

var splitInput = _.partialRight(_.split, "");

exports.lib = {
  'and'             : and,
  'or'              : or,
  'not'             : not,
  'allCombinations' : allCombinations,
  'isPrime'         : isPrime,
  'isInteger'       : isInteger,
  'gt0'             : _.partialRight(_.gt, 0),
  'lt0'             : _.partialRight(_.lt, 0),
  'sortedJoin'      : sortedJoin,
  'evalNestedValue' : evalNestedValue,
  'subSet'          : subSet,
  'splitInput'      : splitInput
};
