const findMostFrequentElement = (arr: string[]) => {
  if (arr.length == 0) {
    return {}
  }
  const occurrences: Record<string, number> = arr.reduce((acc: Record<string, number>, curr) => {
    acc[curr] = acc[curr] ? ++acc[curr] : (acc[curr] = 1)
    return acc
  }, {})

  const newArr: { name: string; times: number }[] = []

  for (const [key, value] of Object.entries(occurrences)) {
    newArr.push({ name: key, times: value })
  }

  let mostFrequentElement = newArr[0]

  for (let i = 0; i < newArr.length; i++) {
    if (newArr[i].times > mostFrequentElement.times) {
      mostFrequentElement = newArr[i]
    }
  }

  return mostFrequentElement
}

export { findMostFrequentElement }
