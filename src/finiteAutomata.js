var lib = require('./lib.js').lib;
var _ = require("lodash");

var dfa_transit = (delta) =>
  (lastState, symbol) => lib.evalNestedValue(delta, [lastState, symbol]);

var dfaGenerator = (tuple) => (inputString) => {
  var dfa_reducer = _.partialRight(_.reduce, dfa_transit(tuple["delta"]), tuple["start-state"]);
  var isFinalState = _.partial(_.includes, tuple["final-states"]);
  return _.flowRight(isFinalState, dfa_reducer, lib.splitInput)(inputString);
}

var epsilonResolver = (delta, nextStates) => {
  var nextEpsilons = _.flatten(nextStates.map((state) =>
    lib.evalNestedValue(delta, [state, 'e'])
  ));
  return lib.or(lib.subSet(nextStates, nextEpsilons), lib.not(nextEpsilons.length)) ?
  nextStates : epsilonResolver(delta, _.union(nextEpsilons, nextStates));
}

var nfa_transit = (delta) => (lastStates, symbol) => {
  var returnStates = _.flatten(lastStates.map((aState) =>
    lib.evalNestedValue(delta, [aState, symbol])
  ));
  return _.flowRight(_.flatten, _.partial(_.union, returnStates), epsilonResolver)(delta, returnStates);
}

var nfaGenerator = (tuple) => (inputString) => {
  var delta = tuple["delta"];
  var lastStates = lib.splitInput(inputString).reduce(
    nfa_transit(delta), epsilonResolver(delta, [tuple["start-state"]])
  );
  return _.flowRight(lib.not, _.isEmpty, _.intersection)(tuple["final-states"], lastStates);
}

exports.finiteAutomata = (type, tuple) =>
    (type == "dfa") ? dfaGenerator(tuple) : nfaGenerator(tuple);

exports.FA = {
  "dfaGenerator": dfaGenerator,
  "dfa_transit": dfa_transit,
  "nfa_transit": nfa_transit,
  "nfaGenerator": nfaGenerator,
  "epsilonResolver": epsilonResolver
}
