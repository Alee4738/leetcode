// CTCI Problem 8.4 Powerset
// Write a method to return all subsets of a set
// I know there are 2^n items in the powerset
// You can choose to include or not include each number in nums

import { TestCase, runTests } from './testHelpers';

// Thinking recursively, take the first item. You can either include or not include it
// Assume we have powerset(nums[1:]).
// powerset(nums) = [nums[0]] + powerset(nums[1:]) + [] + powerset(nums[1:])

function powerset(nums: number[]): number[][] {
  let lastPowerSet: number[][] = [[]];
  for (const num of nums) {
    const oldPowerSetLength = lastPowerSet.length;
    for (let j = 0; j < oldPowerSetLength; j++) {
      const newSetThatIncludesNum = Array.from(lastPowerSet[j]);
      newSetThatIncludesNum.push(num);
      lastPowerSet.push(newSetThatIncludesNum);
    }
  }
  return lastPowerSet;
}

describe(powerset.name, () => {
  const testCases: TestCase<number[], number[][]>[] = [
    new TestCase(
      [5, 6, 7],
      [[], [5], [6], [5, 6], [7], [5, 7], [6, 7], [5, 6, 7]]
    ),
    new TestCase([], [[]]),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = powerset(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
