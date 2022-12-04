import fs from 'fs';

export const readFile = (filename) => fs.readFileSync(filename, 'utf-8').split('\r\n');