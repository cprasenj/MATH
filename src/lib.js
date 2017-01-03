const _ = require('lodash');

const and = (first, second) => first && second;

const or = (first, second) => first || second;

const not = (val) => !val;

const remainder = (one, another) => one % another;

const allCombinations = (list) => {
    const combinator = function(active, rest, bucket) {
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

const add1 = _.partial(_.add, 1);
const sub1 = _.partialRight(_.subtract, 1);

const isPrime = (number) =>
  or(_.lte(number, 3), _.every(_.range(2, _.flowRight(add1, Math.sqrt)(number))
  , _.partial(remainder, number)
  )
);

const isInteger = (number) => _.eq(number, parseInt(number, 10));

const sortedJoin = (list) => list.sort().join('');

const evalNestedValue = (object, keys) => or(keys.reduce((nextObject, key) =>
  not(nextObject) ? nextObject : nextObject[key]
, object), []);

const subSet = (oneStateSet, aNotherStateSet) =>
  and(
    _.gt(aNotherStateSet.length, 0),
    _.every(aNotherStateSet, _.partial(_.includes, oneStateSet))
  );

const splitInput = _.partialRight(_.split, "");

const negate = _.partial(_.multiply, -1);

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
  'splitInput'      : splitInput,
  'remainder'       : remainder,
  'negate'          : negate
};
