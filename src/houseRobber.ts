import { runTests, TestCase } from './testHelpers';

function rob(nums: number[]): number {
  const cache: number[] = [0, 0];
  for (let i = nums.length - 1; i >= 0; i--) {
    const robThisOne = nums[i] + cache[1];
    const robNextOne = cache[0];
    cache[1] = cache[0];
    cache[0] = Math.max(robThisOne, robNextOne);
  }
  return cache[0];
}

describe(rob.name, () => {
  const testCases: TestCase<number[], number>[] = [
    new TestCase([1, 2, 3, 1], 4),
    new TestCase([2, 7, 9, 3, 1], 12),
    new TestCase([100, 2, 100, 2, 2, 100, 100, 100, 2], 400),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = rob(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
