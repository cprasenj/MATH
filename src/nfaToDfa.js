var FA = require('./finiteAutomata.js').FA;
var lib = require('./lib.js').lib;
var nfaToDfa = {};
var _ = require("lodash");

nfaToDfa.findStateCombinations = (allStates) => lib.allCombinations(allStates);

nfaToDfa.findStartState = (delta, initialState) => FA.epsilonResolver(delta, [initialState]);

nfaToDfa.identifyFinalStates = (combinations, nfaFinalStates) =>
  combinations.filter((aCombination) =>
    _.some(nfaFinalStates, _.partial(_.includes, aCombination))
  );

var findDfaTransitions = (delta, alphabet) => (state) => {
  var nextStates = lib.evalNestedValue(delta, [state, alphabet]);
  return _.union(FA.epsilonResolver(delta, nextStates) ,nextStates);
}

var nextStateForAnAlphabet = (combination, delta, alphabet) =>
  lib.sortedJoin(combination
    .map(findDfaTransitions(delta, alphabet))
    .reduce((bucket, states) =>_.union(bucket, states), []));

nfaToDfa.findEquvalantDfaTransitions = (delta, combinatins, alphabets) => {
  var dfaDelta = {};
  alphabets.forEach(function(alphabet) {
    combinatins.forEach((combination) => {
      var key = lib.sortedJoin(combination);
      dfaDelta[key] || (dfaDelta[key] = {});
      dfaDelta[key][alphabet] = nextStateForAnAlphabet(combination, delta, alphabet);
    });
  })
  return dfaDelta;
}

nfaToDfa.converter = (nfa) => {
  var dfa = {};
  var alphabets = nfa['alphabets'];
  var nfaDelta = nfa['delta'];
  var combinations = nfaToDfa.findStateCombinations(nfa['states']);
  dfa['states'] = combinations.map(function(combination) {
    return lib.sortedJoin(combination);
  });
  dfa['alphabets'] = alphabets;
  dfa['delta'] = nfaToDfa.findEquvalantDfaTransitions(nfaDelta, combinations, alphabets);
  dfa['start-state'] = lib.sortedJoin(nfaToDfa.findStartState(nfaDelta, nfa['start-state']));
  dfa['final-states'] =
    nfaToDfa.identifyFinalStates(combinations, nfa['final-states']).map(function(combination) {
    return lib.sortedJoin(combination);
  });
  return dfa;
}

exports.nfaToDfa = nfaToDfa;
