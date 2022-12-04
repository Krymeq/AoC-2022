import { readFile } from "../utils/readFile.mjs";
import { sum } from "../utils/sum.mjs";

const results = {
  A: {
    X: 'DRAW',
    Y: 'WIN',
    Z: 'LOSE',
  },
  B: {
    X: 'LOSE',
    Y: 'DRAW',
    Z: 'WIN',
  },
  C: {
    X: 'WIN',
    Y: 'LOSE',
    Z: 'DRAW',
  }
}

const outcomeToPoints = (outcome) => {
  switch(outcome) {
    case 'WIN':
      return 6;
    case 'DRAW':
      return 3;
    default:
      return 0;
  }
}

const getPointsForSelectedShape = (shape) => {
  switch(shape) {
    case 'X':
      return 1;
    case 'Y':
      return 2;
    case 'Z':
      return 3;
  }
}

const getYourSelectionBySecondStrat = (strat) => {
  const outcomes = {X: 'LOSE', Y: 'DRAW', Z: 'WIN'};
  const selections = Object.entries(results[strat.opponent]);
  return selections.find((selection) => selection[1] === outcomes[strat.you])[0];
}

const getPointsFromDesiredOutcome = (outcome) => {
  switch(outcome) {
    case 'X':
      return 0;
    case 'Y':
      return 3;
    case 'Z':
      return 6;
  }
}

const getMovesFromLine = (line) => {
  const splitted = line.split(' ');
  return { opponent: splitted[0], you: splitted[1] }
}

const getPointsFromResult = (result) => {
  return outcomeToPoints(results[result.opponent][result.you]);
}


// part 1
const lines = readFile('input.txt');
const strategies = lines.map(getMovesFromLine);
const pointsByFirstStrat = strategies.map((strategy) => getPointsForSelectedShape(strategy.you) + getPointsFromResult(strategy));

console.log(sum(pointsByFirstStrat));

// part 2
const pointsBySecondStrat = strategies
  .map((strategy) => 
    getPointsForSelectedShape(getYourSelectionBySecondStrat(strategy)) +
    getPointsFromDesiredOutcome(strategy.you)
  );
console.log(sum(pointsBySecondStrat));