import { findMostFrequentElement } from '../utils/element'

describe('function findMostFrequentElement', () => {
  // Returns the most frequent element in an array of strings
  it('should return the most frequent element when given an array of strings', () => {
    const arr = ['apple', 'banana', 'apple', 'banana', 'banana']
    const result = findMostFrequentElement(arr)
    expect(result).toEqual({ name: 'banana', times: 3 })
  })

  // Returns the first most frequent element in case of a tie
  it('should return the first most frequent element when there is a tie', () => {
    const arr = ['apple', 'banana', 'apple', 'banana']
    const result = findMostFrequentElement(arr)
    expect(result).toEqual({ name: 'apple', times: 2 })
  })

  // Works correctly with an array of one element
  it('should return the only element when given an array of one element', () => {
    const arr = ['apple']
    const result = findMostFrequentElement(arr)
    expect(result).toEqual({ name: 'apple', times: 1 })
  })

  // Returns an empty object when given an empty array
  it('should return an empty object when given an empty array', () => {
    const arr: string[] = []
    const result = findMostFrequentElement(arr)
    expect(result).toEqual({ name: '', times: 0 })
  })
})
