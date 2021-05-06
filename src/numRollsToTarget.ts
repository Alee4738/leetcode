import { TestCase, runTests } from './testHelpers';

function numRolls(
  d: number,
  f: number,
  target: number,
  cache: number[][]
): number {
  if (target <= 0) {
    return 0;
  }
  if (d === 1) {
    if (target <= f) {
      cache[d][target] = 1;
    } else {
      cache[d][target] = 0;
    }
  }
  if (cache[d][target] !== undefined) {
    return cache[d][target];
  }

  let result = 0;
  for (let i = 1; i <= f; i++) {
    result += numRolls(d - 1, f, target - i, cache);
  }
  result %= Math.pow(10, 9) + 7;
  cache[d][target] = result;
  return result;
}

function numRollsToTarget(d: number, f: number, target: number): number {
  // cache[i][j] === numRollsToTarget(i, f, j)
  const cache: number[][] = [];
  for (let i = 0; i <= d; i++) {
    cache.push([]);
  }

  const answer = numRolls(d, f, target, cache);
  // console.log(cache);
  return answer;
}

describe(numRollsToTarget.name, () => {
  const testCases: TestCase<[number, number, number], number>[] = [
    new TestCase([1, 6, 3], 1),
    new TestCase([2, 6, 7], 6),
    new TestCase([2, 5, 10], 1),
    new TestCase([1, 2, 3], 0),
    new TestCase([30, 30, 500], 222616187),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = numRollsToTarget(...testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
