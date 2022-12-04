import { deduplicate } from '../utils/deduplicate.mjs';
import { readFile } from '../utils/readFile.mjs';
import { sum } from '../utils/sum.mjs';

const isLowercase = (character) => character === character.toLowerCase();

const getPriority = (letter) => {
  const charCode = letter.charCodeAt(0);
  if (isLowercase(letter))
    return charCode - 96;
  
  return charCode - 38;
}

const splitInto3s = (lines) => {
  const splitted = [];
  lines.forEach((line, index) => {
    const setIndex = Math.floor(index / 3);
    if (splitted[setIndex] === undefined) splitted.push([]);
    splitted[setIndex].push(line.split(''));
  })
  return splitted;
}

const getCommonInThree = (three) => three[0].find((letter) => three.every((line) => line.includes(letter)));

const getRepeatedItems = (backpack) => deduplicate(backpack.c1.filter((item) => backpack.c2.find((anotherItem) => item === anotherItem)));

const toCompartments = (line) => ({
  c1: line.substr(0, Math.floor(line.length / 2)).split(''),
  c2: line.substr(Math.floor(line.length / 2)).split(''),
});

const lines = readFile('input.txt');

// part 1
const compartments = lines.map(toCompartments);
const repeatedItemsInBackpacks = compartments.map(getRepeatedItems);
const result = sum(repeatedItemsInBackpacks.map((repeatedItems) => sum(repeatedItems.map(getPriority))));

console.log(result);

// part 2
const threes = splitInto3s(lines);
const commons = threes.map(getCommonInThree);
const resultOfPart2 = sum(commons.map(getPriority));

console.log(resultOfPart2)