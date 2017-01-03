const FA = require('./finiteAutomata.js').FA;
const lib = require('./lib.js').lib;
const nfaToDfa = {};
const _ = require("lodash");

nfaToDfa.findStateCombinations = (allStates) => lib.allCombinations(allStates);

nfaToDfa.findStartState = (delta, initialState) => FA.epsilonResolver(delta, [initialState]);

nfaToDfa.identifyFinalStates = (combinations, nfaFinalStates) =>
  combinations.filter((aCombination) =>
    _.some(nfaFinalStates, _.partial(_.includes, aCombination))
  );

const findDfaTransitions = (delta, alphabet) => (state) => {
  const nextStates = lib.evalNestedValue(delta, [state, alphabet]);
  return _.union(FA.epsilonResolver(delta, nextStates) ,nextStates);
}

const nextStateForAnAlphabet = (combination, delta, alphabet) =>
  lib.sortedJoin(combination
    .map(findDfaTransitions(delta, alphabet))
    .reduce((bucket, states) => _.union(bucket, states), []));

nfaToDfa.findEquvalantDfaTransitions = (delta, combinatins, alphabets) => {
  var dfaDelta = {};
  alphabets.forEach(function(alphabet) {
    combinatins.forEach((combination) => {
      const key = lib.sortedJoin(combination);
      dfaDelta[key] || (dfaDelta[key] = {});
      dfaDelta[key][alphabet] = nextStateForAnAlphabet(combination, delta, alphabet);
    });
  })
  return dfaDelta;
}

nfaToDfa.converter = (nfa) => {
  var dfa = {};
  const alphabets = nfa['alphabets'];
  const nfaDelta = nfa['delta'];
  const combinations = nfaToDfa.findStateCombinations(nfa['states']);
  dfa['states'] = combinations.map(combination => lib.sortedJoin(combination));
  dfa['alphabets'] = alphabets;
  dfa['delta'] = nfaToDfa.findEquvalantDfaTransitions(nfaDelta, combinations, alphabets);
  dfa['start-state'] = lib.sortedJoin(nfaToDfa.findStartState(nfaDelta, nfa['start-state']));
  dfa['final-states'] =
    nfaToDfa.identifyFinalStates(combinations, nfa['final-states']).map(combination =>
      lib.sortedJoin(combination)
    );
  return dfa;
}

exports.nfaToDfa = nfaToDfa;
