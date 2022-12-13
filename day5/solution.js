import { readFile } from '../utils/readFile.mjs';
import { withArray } from '../utils/withArray.mjs';

const lines = readFile('input.txt')
  .filter(line => line.length !== 0);

const readStacks = (stackLines, stackPositions) => {
  const stacks = [];
  stackPositions.forEach((stackPosition) => {
    stacks.push([]);
    stackLines.forEach((stackLine) => {
      const crate = stackLine[stackPosition.position];
      if (crate !== ' ') {
        stacks[stackPosition.num].push(stackLine[stackPosition.position]);
      }
    })
  })
  return stacks;
}

const executeMove = (stacks, move) => {
  const picked = withArray(stacks[move.from]).shiftMany(move.amount);
  stacks[move.to].unshift(...picked);
}

const readMove = (moveLine) => {
  const [amount, from, to] = moveLine
    .replace('move ', '')
    .replace(' from ', ' ')
    .replace(' to ', ' ')
    .split(' ')
    .map((num) => parseInt(num));
  return { amount, from: from - 1, to: to - 1 };
}

/******************************************************************************\
  solution for both parts lol
  the first one differs only by the reverse() call executed on "picked" array
  to simulate placing them in different order 
\******************************************************************************/

const stackNumbers = lines.find((line) => line.match(/^[\d ]+$/));
const stackLines = lines.filter((line) => line.match(/^\[[A-Z]\] +/));
const moveLines = lines.filter((line) => line.match(/^move \d+ from \d+ to \d+$/))
const stackPositionsInString = stackNumbers
  .split('')
  .map((char, index) => isNaN(parseInt(char)) ? null : {num: parseInt(char) - 1, position: index})
  .filter((obj) => obj !== null);

const stacks = readStacks(stackLines, stackPositionsInString);
const moves = moveLines.map(readMove);

moves.forEach((move) => {
  executeMove(stacks, move);
});

console.log(stacks.map((stack) => stack[0]).join(''));