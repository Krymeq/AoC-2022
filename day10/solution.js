import { readFile } from "../utils/readFile.mjs";

const instructions = readFile("input.txt");
const NOOP = 'noop';
const cyclesToRead = [20, 60, 100, 140, 180, 220];

let registryValue = 1;
let sum = 0;
let cycle = 1;

// part 1

for (const instruction of instructions) {
  const oldRegistryValue = registryValue;
  const incrementValue = parseInt(instruction.split(' ')[1] || "0")
  if (instruction == NOOP) {
    cycle++;
  } else {
    cycle += 2;
    registryValue += incrementValue;
  }

  if (cyclesToRead[0] <= cycle) {
    const readCycle = cyclesToRead.shift() || 0;
    const signalStrength = readCycle;
    sum += oldRegistryValue * signalStrength;
    if (readCycle == cycle) {
      sum += incrementValue * signalStrength;
    }
  }
}

console.log(sum);

registryValue = 1;
let currentInstructionIndex = 0;
let lastInstructionBeginCycle = 1;

const screen = new Array(6).fill(0).map(() => new Array(40).fill('.'));
screen.forEach((row, rowIndex) => {
  row.forEach((_, pixelIndex) => {
    const currentCycle = rowIndex * 40 + pixelIndex + 1
    const processedInstruction = instructions[currentInstructionIndex];
    if (Math.abs(registryValue - pixelIndex) <= 1) screen[rowIndex][pixelIndex] = "#";

    if (processedInstruction == NOOP) {
      currentInstructionIndex++;
      lastInstructionBeginCycle++;
    } else {
      if (currentCycle - lastInstructionBeginCycle >= 1) {
        const incrementValue = parseInt(processedInstruction.split(' ')[1] || "0");
        registryValue += incrementValue;
        currentInstructionIndex++;
        lastInstructionBeginCycle = currentCycle + 1;
      }
    }
  })
})

console.log(screen.map((row) => row.join("")))