/**
 Do not return anything, modify arr in-place instead.
 */
import { runTests, TestCase } from './testHelpers';

function duplicateZeros(arr: number[]): void {
  const result = [];
  for (const num of arr) {
    if (result.length === arr.length) {
      break;
    }
    if (num === 0) {
      result.push(0);
      result.push(0);
    } else {
      result.push(num);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = result[i];
  }
}

describe(duplicateZeros.name, () => {
  const testCases: TestCase<number[], number[]>[] = [
    new TestCase([1, 0, 2, 3, 0, 4, 5, 0], [1, 0, 0, 2, 3, 0, 0, 4]),
    new TestCase([1, 2, 3], [1, 2, 3]),
  ];

  runTests(testCases, (testCase) => {
    duplicateZeros(testCase.input);
    expect(testCase.input).toEqual(testCase.expectedOutput);
  });
});
