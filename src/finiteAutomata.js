const lib = require('./lib.js').lib;
const _ = require("lodash");

const dfa_transit = (delta) =>
  (lastState, symbol) => lib.evalNestedValue(delta, [lastState, symbol]);

const dfaGenerator = (tuple) => (inputString) => {
  const dfa_reducer = _.partialRight(_.reduce, dfa_transit(tuple["delta"]), tuple["start-state"]);
  const isFinalState = _.partial(_.includes, tuple["final-states"]);
  return _.flowRight(isFinalState, dfa_reducer, lib.splitInput)(inputString);
}

const epsilonResolver = (delta, nextStates) => {
  const nextEpsilons = _.flatten(nextStates.map((state) =>
    lib.evalNestedValue(delta, [state, 'e'])
  ));
  return lib.or(lib.subSet(nextStates, nextEpsilons), lib.not(nextEpsilons.length)) ?
  nextStates : epsilonResolver(delta, _.union(nextEpsilons, nextStates));
}

const nfa_transit = (delta) => (lastStates, symbol) => {
  const returnStates = _.flatten(lastStates.map((aState) =>
    lib.evalNestedValue(delta, [aState, symbol])
  ));
  return _.flowRight(_.flatten, _.partial(_.union, returnStates), epsilonResolver)(delta, returnStates);
}

const nfaGenerator = (tuple) => (inputString) => {
  const delta = tuple["delta"];
  const lastStates = lib.splitInput(inputString).reduce(
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
