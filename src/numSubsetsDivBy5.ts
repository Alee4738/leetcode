// Inspired by 3Blue1Brown complex number puzzle:
// Find the number of subsets of {1, ..., 2000}, the sum of whose elements is divisible by 5.
// https://www.youtube.com/watch?v=bOXCLR3Wric

import { runTests, TestCase } from './testHelpers';

// Return [0, 1, 2, ... size - 1]
function firstIndices(size: number): number[] {
  const subset = [];
  let curSize = 0;
  while (curSize < size) {
    subset[curSize] = curSize;
    curSize++;
  }
  return subset;
}

function getMaxIndices(indexArrLength: number, arrLength: number): number[] {
  const ret = [];
  let maxCurIndex = arrLength - indexArrLength;

  while (maxCurIndex < arrLength) {
    ret.push(maxCurIndex);
    maxCurIndex++;
  }
  return ret;
}

// @param size must be > 0
// @return next set indices if exists, otherwise undefined
function nextIndices(indices: number[], size: number): number[] | undefined {
  if (size <= 0) {
    console.error('size <= 0');
    return undefined;
  }
  const maxIndices = getMaxIndices(indices.length, size);
  const ret = Array.from(indices);
  let i = indices.length - 1;
  while (i >= 0) {
    const ithIndex = ret[i];
    if (ithIndex < maxIndices[i]) {
      ret[i]++;
      // reset following indices
      for (let j = i + 1; j < indices.length; j++) {
        ret[j] = ret[j - 1] + 1;
      }
      return ret;
    }
    i--;
  }
  return undefined;
}

function numSubsetsDivByX(max: number, x: number): number {
  let count = 0;
  for (let size = 0; size <= max; size++) {
    let indices: number[] | undefined = firstIndices(size);
    while (indices !== undefined) {
      const subset = indices.map((val) => val + 1);
      const sum = subset.reduce((acc, curr) => acc + curr, 0);
      // console.log(subset, 'sum', sum);

      if (sum % x === 0) {
        count++;
      }
      indices = nextIndices(indices, max);
    }
  }
  return count;
}

describe(nextIndices.name, () => {
  const testCases: TestCase<[number[], number], number[] | undefined>[] = [
    new TestCase([[0, 1, 2], 4], [0, 1, 3], 'increment last index'),
    new TestCase(
      [[0, 1, 3], 4],
      [0, 2, 3],
      'last digit is maxed, increment 2nd to last digit'
    ),
    new TestCase(
      [[0, 2, 3], 4],
      [1, 2, 3],
      'last 2 digits maxed, increment 3rd to last digit'
    ),
    new TestCase(
      [[0, 3, 4], 5],
      [1, 2, 3],
      'after incrementing, reset later indices'
    ),
    new TestCase(
      [[1, 2, 3], 4],
      undefined,
      'all digits maxed, return undefined'
    ),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = nextIndices(...testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});

fdescribe(numSubsetsDivByX.name, () => {
  const testCases: TestCase<[number, number], number>[] = [
    new TestCase([3, 5], 2), // [1,2,3] -> [], [2,3]
    new TestCase([5, 5], 8), // [1,2,3,4,5] -> [], [5], [1,4], [2,3], [1,4,5], [2,3,5], [1,2,3,4], [1,2,3,4,5]
    // My solution is too time-inefficient for the 3b1b case.
    // new TestCase([2000, 5], 8),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = numSubsetsDivByX(...testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
