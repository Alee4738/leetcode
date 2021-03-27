import { TestCase } from './testHelpers';

function climbStairsHelper(n: number, cache: Map<number, number>): number {
  if (n === 1) {
    return 1;
  } else if (n === 0) {
    return 1;
  }
  const cachedResult = cache.get(n);
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  let totalWays = 0;
  const numWaysWhenTaking1Step = climbStairsHelper(n - 1, cache);
  const numWaysWhenTaking2Steps = climbStairsHelper(n - 2, cache);
  totalWays = numWaysWhenTaking1Step + numWaysWhenTaking2Steps;
  cache.set(n, totalWays);
  return totalWays;
}

function climbStairs(n: number): number {
  return climbStairsHelper(n, new Map());
}

describe(climbStairs.name, () => {
  const testCases: TestCase<number, number>[] = [
    new TestCase(2, 2),
    new TestCase(10, 89),
    new TestCase(20, 10946),
  ];

  testCases.forEach((testCase) => {
    it(testCase.desc ?? 'None', () => {
      const actualResult = climbStairs(testCase.input);
      expect(actualResult).toEqual(testCase.expectedOutput);
    });
  });
});
