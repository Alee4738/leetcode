// CTCI Problem 8.1 Triple Step

import { TestCase, runTests } from './testHelpers';

// n steps. Can hop either 1, 2, or 3 steps at a time. How many ways can go up stairs?
function numWaysUpStairs(n: number): number {
  if (n <= 0) {
    return 1;
  } else if (n === 1) {
    return 1;
  } else if (n === 2) {
    return 2;
  } else if (n === 3) {
    return 4;
  }

  const results = [1, 2, 4];
  let lastNCalculated = 3;
  while (n > lastNCalculated) {
    const nextResult = results[0] + results[1] + results[2];
    results.push(nextResult);
    results.shift();
    lastNCalculated++;
  }
  return results[2];
}

describe(numWaysUpStairs.name, () => {
  const testCases: TestCase<number, number>[] = [
    new TestCase(1, 1),
    new TestCase(2, 2),
    new TestCase(3, 4),
    new TestCase(4, 7),
    new TestCase(5, 13),
    /*
    1,1,1,1,1
    1,1,1,2
    1,1,2,1
    1,1,3
    1,2,1,1
    1,2,2
    1,3,1
    2,1,1,1
    2,1,2
    2,2,1
    2,3
    3,1,1
    3,2
    */
  ];

  runTests(testCases, (testCase) => {
    const actualResult = numWaysUpStairs(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
