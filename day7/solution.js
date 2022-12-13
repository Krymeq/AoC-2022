import { readFile } from '../utils/readFile.mjs';
import { sum } from '../utils/sum.mjs';

const lines = readFile('input.txt');
const CD_HEADER = '$ cd ';
const DIR_HEADER = 'dir';
const PARENT_DIR = '..';
const ROOT_DIR = '/';
const thresholdForFirstPart = 100000;
const totalSizeAvailable = 70000000;

const tree = {
  name: ROOT_DIR,
  content: [],
};

let currentDirectory = tree;

const processContentLine = (contentLine) => {
  const [header, name] = contentLine.split(' ');
  if (header === DIR_HEADER) {
    return { name, content: [], parentDirectory: currentDirectory }
  }
  return { name, size: parseInt(header) }
}

// build tree
lines.forEach((line) => {
  if (line.startsWith(CD_HEADER)) {
    const newDirectory = line.replace(CD_HEADER, '');
    if (newDirectory === PARENT_DIR) {
      currentDirectory = currentDirectory.parentDirectory;
    } else if (newDirectory === ROOT_DIR) {
      currentDirectory = tree;
    } else {
      currentDirectory = currentDirectory.content.find((child) => child.name === newDirectory);
    }
  }

  if (!line.startsWith('$')) {
    const node = processContentLine(line);
    currentDirectory.content.push(node);
  }
})

const isDirectory = (item) => !!item.content;

const calculateDirectorySize = (directory) => directory.content
  .reduce((previousSum, currentItem) => previousSum + (isDirectory(currentItem) ? calculateDirectorySize(currentItem) : currentItem.size), 0);

const rootSize = calculateDirectorySize(tree);
const sizeAvailable = totalSizeAvailable - rootSize;
const requiredSize = 30000000;
const thresholdForSecondPart = requiredSize - sizeAvailable;
console.log(thresholdForSecondPart)

const getTotalSizeOfDirsBelowThreshold = (tree) => {
  return sum(tree.content
    .filter((elem) => elem.content)
    .map((directory) => {
      const sumOfChildrenSizesBelowThreshold = getTotalSizeOfDirsBelowThreshold(directory);
      const directorySize = calculateDirectorySize(directory);
      return directorySize > thresholdForFirstPart ? sumOfChildrenSizesBelowThreshold : sumOfChildrenSizesBelowThreshold + directorySize;
    }))
}

const getSmallestDirectoryAboveThreshold = (tree) => {
  const size = calculateDirectorySize(tree);
  const descendantDirectoriesSizes = tree.content.filter(isDirectory).map(getSmallestDirectoryAboveThreshold);
  const validDescendantSizes = descendantDirectoriesSizes.filter((size) => size >= thresholdForSecondPart);
  if (validDescendantSizes.length === 0) {
    return size >= thresholdForFirstPart ? size : 0;
  }
  
  const minimumValidDescendantSize = Math.min(validDescendantSizes);
  if (size < thresholdForFirstPart) {
    return minimumValidDescendantSize;
  }

  return Math.min(minimumValidDescendantSize, size);
}


// part 1
console.log(getTotalSizeOfDirsBelowThreshold(tree));

// part 2
console.log(getSmallestDirectoryAboveThreshold(tree));