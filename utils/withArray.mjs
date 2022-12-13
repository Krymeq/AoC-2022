export const withArray = (arr) => ({
  deduplicate: () => [...new Set(arr)],
  splitByPredicate: (predicate) => ([
    arr.filter((elem) => predicate(elem)),
    arr.filter((elem) => !predicate(elem)),
  ]),
  shiftMany: (amount) => arr.splice(0, amount),
})