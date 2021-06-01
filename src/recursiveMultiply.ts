// CTCI Problem 8.5 Recursive Multiply
// Write a recursive function to recursiveMultiply two positive integers without using *
// You can use addition, subtraction, and bit shifting, but you should minimize
// the number of those operations

import { TestCase, runTests } from './testHelpers';

// Naive: for loop, just add num1 to the result num2 times
// O(num2)

// But it needs to be recursive
// num2 >> 1 until it equals 0
// if the shifted bit is 0, add nothing
// if shifted bit is 1, add ... num1 * 2^(num_shifted), which is num1 << num_shifted
// O(1) using bit shifting
function multHelper(num1: number, num2: number, timesShifted: number): number {
  if (num2 === 0) {
    return 0;
  }
  let lastBit = num2 & 1;
  // (num1 << timesShifted) is num1 * 2^timesShifted
  let result = lastBit === 1 ? num1 << timesShifted : 0;
  num2 = num2 >> 1;
  timesShifted++;
  result += multHelper(num1, num2, timesShifted);
  return result;
}

function recursiveMultiply(num1: number, num2: number): number {
  return multHelper(num1, num2, 0);
}

describe(recursiveMultiply.name, () => {
  const testCases: TestCase<[number, number], number>[] = [
    new TestCase([4, 5], 20),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = recursiveMultiply(...testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});

/*
recursiveMultiply(4, 5) -> 20
  multHelper(4,5,0) -> 20
    lastBit 1
    result 20
    num2 2
    timesShifted 1
    multHelper(4, 2, 1) -> 16
      lastBit 0
      result 16
      num2 1
      timesShifted 2
      multHelper(4, 1, 2) -> 16
        lastBit 1
        result 16
        num2 0
        timesShifted 3
        multHelper(4, 0, 3) -> 0
*/
