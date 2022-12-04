import { readFile } from '../utils/readFile.mjs';

const getRangeEnds = (rangeAsText) => {
  const ends = rangeAsText.split('-');
  return { from: parseInt(ends[0]), to: parseInt(ends[1]) }
}

const isSubset = (range1, range2) => range1.from >= range2.from && range1.to <= range2.to;

const rangeToArray = (range) => new Array(range.to - range.from + 1).fill(range.from).map((el, idx) => el + idx);

const getCommonPart = (ranges) => {
  const [range1, range2] = ranges;
  const commonPart = {
    from: range1.from >= range2.from ? range1.from : range2.from,
    to: range1.to <= range2.to ? range1.to : range2.to,
  }

  if (commonPart.from > commonPart.to) return null;
  return commonPart;
}

const isAnySubset = (ranges) => {
  const [firstRange, secondRange] = ranges;
  const isFirstRangeSubset = isSubset(firstRange, secondRange);
  const isSecondRangeSubset = isSubset(secondRange, firstRange);
  return isFirstRangeSubset || isSecondRangeSubset;
}

const getRanges = (line) => line
  .split(',')
  .map(getRangeEnds)

// part 1
const lines = readFile('input.txt');
const ranges = lines.map(getRanges);
const result = ranges.filter(isAnySubset).length;
console.log(result);

// part 2
const commonParts = ranges.map(getCommonPart).filter((el) => el !== null);
// KEKW, forgot to spread :v 
// task failed successfully
const overlapCount = commonParts.reduce((prev, curr) => prev.add(rangeToArray(curr)), new Set()).size;
console.log(overlapCount);
console.log(commonParts.count);
