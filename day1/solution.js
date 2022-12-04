import fs from 'fs';

const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

// Part 1

const sets = readFile("input.txt")
  .split("\r\n\r\n")
  .map(set => set.split('\r\n'))

const sums = sets.map(set => set.reduce((prev, curr) => prev + parseInt(curr), 0));
  
console.log(Math.max(...sums));

// Part 2

const sorted = sums.sort((a, b) => b - a);
console.log(sorted[0] + sorted[1] + sorted[2]);
