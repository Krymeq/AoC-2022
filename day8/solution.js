import { readFile } from "../utils/readFile.mjs";

const lines = readFile("input.txt");
const treeMap = lines.map((row) => row.split('').map((tree) => parseInt(tree)));
let count = 0;

// part 1

treeMap.forEach((treeRow, row) => {
  treeRow.forEach((tree, column) => {
    if (row == 0 || column == 0 || row == treeMap.length - 1 || column == treeRow.length - 1) {
      count++;
      return;
    }
    const treeColumn = treeMap.map((treeRow) => treeRow[column]);
    const treesAbove = treeColumn.slice(0, row);
    const treesBelow = treeColumn.slice(row + 1);
    const treesOnTheLeft = treeRow.slice(0, column);
    const treesOnTheRight = treeRow.slice(column + 1);

    if (
      treesAbove.some((treeAbove) => treeAbove >= tree) &&
      treesBelow.some((treeBelow) => treeBelow >= tree) &&
      treesOnTheLeft.some((treeOnTheLeft) => treeOnTheLeft >= tree) &&
      treesOnTheRight.some((treeOnTheRight) => treeOnTheRight >= tree)
    ) return;
    count++;
  });
});

console.log(count);

// part 2

const calculateScenicScore = (row, column) => {
  const treeColumn = treeMap.map((treeRow) => treeRow[column]);
  const treeRow = treeMap[row];
  const tree = treeMap[row][column];
  const treesAbove = treeColumn.slice(0, row).reverse();
  const treesOnTheLeft = treeRow.slice(0, column).reverse();
  const treesBelow = treeColumn.slice(row + 1);
  const treesOnTheRight = treeRow.slice(column + 1);
  const directions = [treesAbove, treesBelow, treesOnTheLeft, treesOnTheRight];
  const firstBlockingTrees = directions.map((direction) => { 
    const firstBlockingTreeIndex = direction.findIndex((treeOnRow) => treeOnRow >= tree);
    if (firstBlockingTreeIndex < 0) return direction.length;
    return firstBlockingTreeIndex + 1;
  });
  return firstBlockingTrees.reduce((prev, curr) => prev * curr, 1);
}

// some magic lulz
console.log(Math.max(...treeMap.flatMap((row, idx) => row.map((_, col) => calculateScenicScore(idx, col)))));