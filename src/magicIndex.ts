// CTCI Problem 8.3 Magic Index
// Magic index of A[0..n-1] is an index i such that A[i] = i
// Given a sorted array of distinct integers, find a magic index if one exists

import { TestCase, runTests } from './testHelpers';

// Naive solution: scan through the array i = 0 to n-1 and check. O(n)
// Try binary search
// i = n/2. Let's say A[i] != i. Then what?
// if A[i] > i, then A[i] >= i+1. Also this means on the right side A[i+1...n] must also be > A[i] >= i + 1
// So, A[i+1] > i + 1. Same argument for A[i+2...n-1], so there is no magic index on the right side

// if A[i] < i, then A[i] <= i-1. Same argument, so no magic index on left side

// Return magic index. If none exists, return -1
// arr is a sorted array with distinct integers
function magicIndex(arr: number[]): number {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    const midVal = arr[mid];
    if (midVal === mid) {
      return mid;
    } else if (midVal > mid) {
      end = mid;
    } else if (midVal < mid) {
      start = mid + 1;
    } else {
      throw new Error('impossible');
    }
  }
  return -1;
}

describe(magicIndex.name, () => {
  const testCases: TestCase<number[], number>[] = [
    new TestCase([-10, -3, 1, 3], 3, 'Find it on the right edge'),
    new TestCase([1], -1, '1-length arr, magic index does not exist'),
    new TestCase([0], 0, '1-length arr, magic index exists'),
    new TestCase([-100, 1], 1, '2-length arr, magic index exists'),
    new TestCase(
      [-100, -99, 2, 100, 101, 102, 103, 104, 105],
      2,
      'Find on left side'
    ),
    new TestCase(
      [-100, -99, -98, 100, 101, 102, 103, 104, 105],
      -1,
      'Does not exist'
    ),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = magicIndex(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});

// Followup: What if arr is not distinct?
// if A[i] > i, then A[i] >= i+1. So A[i+1] >= A[i] >= i+1, so A[i+1] >= i+1, so it doesn't work.
// You need to do the naive solution
