import { runTests, TestCase } from './testHelpers';

function boundedCache(start: number, end: number, cache: number[][]): number {
  if (start >= end) {
    return 0;
  }
  return cache[start][end];
}

function getAmount(start: number, end: number, cache: number[][]): number {
  if (start === end) {
    cache[start][end] = 0;
    return 0;
  }

  let min = Infinity;
  for (let i = start; i <= end; i++) {
    min = Math.min(
      min,
      i +
        Math.max(
          boundedCache(start, i - 1, cache),
          boundedCache(i + 1, end, cache)
        )
    );
  }
  cache[start][end] = min;
  return min;
}

function getMoneyAmount(n: number): number {
  const cache: number[][] = [];
  for (let i = 0; i <= n; i++) {
    cache.push([]);
  }

  for (let row = n; row >= 1; row--) {
    for (let col = row; col <= n; col++) {
      getAmount(row, col, cache);
    }
  }
  return cache[1][n];
}

describe(getMoneyAmount.name, () => {
  const testCases: TestCase<number, number>[] = [
    new TestCase(10, 16),
    new TestCase(1, 0),
    new TestCase(100, 400),
    new TestCase(53, 186),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = getMoneyAmount(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
