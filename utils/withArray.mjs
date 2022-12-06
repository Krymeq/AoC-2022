export const withArray = (arr) => ({
  deduplicate: () => [...new Set(arr)],
  splitByPredicate: (predicate) => ({
    accepted: arr.filter((elem) => predicate(elem)),
    rejected: arr.filter((elem) => !predicate(elem)),
  }),
  shiftMany: (amount) => arr.splice(0, amount),
})