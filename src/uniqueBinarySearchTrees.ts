// Given an integer n, return the number of structurally unique BST's (binary search trees) which has exactly n nodes of unique values from 1 to n.
// https://leetcode.com/problems/unique-binary-search-trees/

import { TestCase } from './testCase';

function numTreesHelper(n: number, cache: number[]): number {
  // Given a number k in [1,2,...n], what is the number of trees I can construct if k is the root node?
  // on the left side, must have [1, ..., k-1]
  // on the right side, must have [k+1, ..., n]
  // answer = numTrees(leftLen) * numTrees(rightLen)
  // note: leftLen and rightLen are both strictly < n, so this can be turned into a recursive problem
  if (cache[n] !== undefined) {
    return cache[n];
  }
  let totalTrees = 0;
  for (let k = 1; k <= n; k++) {
    const numNodesOnLeft = k - 1; // 1 to k-1
    const numNodesOnRight = n - k; // k+1 to n
    const numTreesWithRootNodeK =
      numTreesHelper(numNodesOnLeft, cache) *
      numTreesHelper(numNodesOnRight, cache);
    totalTrees += numTreesWithRootNodeK;
  }
  cache[n] = totalTrees;
  return totalTrees;
}

function numTrees(n: number): number {
  const numTreesCache: number[] = [1, 1];
  return numTreesHelper(n, numTreesCache);
}

describe(numTrees.name, () => {
  const testCases: TestCase<number, number>[] = [
    new TestCase(3, 5),
    new TestCase(4, 14),
    new TestCase(5, 42),
    new TestCase(10, 16796),
  ];

  testCases.forEach((testCase) => {
    it(testCase.desc ?? 'None', () => {
      const actualResult = numTrees(testCase.input);
      expect(actualResult).toEqual(testCase.expectedOutput);
    });
  });
});
