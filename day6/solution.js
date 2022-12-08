import { readFile } from '../utils/readFile.mjs';

const buffer = readFile('input.txt')[0].split('');
const areDistinctLetters = (letterArray) => new Set(letterArray).size === letterArray.length;

const detect = (length) => ({
  distinctCharactersIn: (buffer) => {
    for (let i = length; i < buffer.length; i++) {
      const subbuffer = buffer.slice(i - length, i);
      if (areDistinctLetters(subbuffer)) {
        return i;
      }
    }
  }
});

// part 1
console.log(detect(4).distinctCharactersIn(buffer));

// part 2
console.log(detect(14).distinctCharactersIn(buffer));