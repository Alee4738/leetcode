import { runTests, TestCase } from './testHelpers';

/**
 * Count up and print numbers until the max
 * Ex. Given [1,2,3] with max digit 5, print [1,2,4], [1,2,5], [1,3,0], [1,3,1], [1,3,2], ... [5,5,5]
 * @param arr current number with each digit in order, ex. 1234 = [1,2,3,4]
 * @param maxDigit maximum possible value for each digit
 */
export let counter = (arr: number[], maxDigit: number): void => {
  let i = arr.length - 1;
  let isCarryingOver = false;
  // if i >= 0, then arr[i] will always be <= maxDigit
  while (i >= 0) {
    if (!isCarryingOver) {
      console.log(arr);
    }
    arr[i]++;
    if (arr[i] > maxDigit) {
      arr[i] = 0;
      i--;
      isCarryingOver = true;
    } else {
      i = arr.length - 1;
      isCarryingOver = false;
    }
  }
};

export function nextNumber(
  num: number[],
  maxDigit: number
): number[] | undefined {
  const nextNum = Array.from(num);
  let i = nextNum.length - 1;
  let isCarryingOver = false;
  while (i >= 0) {
    console.log('before', nextNum);
    nextNum[i]++;
    console.log('after', nextNum);
    const maxDigitForThisIndex = maxDigit + i - (nextNum.length - 1);
    console.log('maxDigitForThisIndex', maxDigitForThisIndex);
    if (nextNum[i] > maxDigitForThisIndex) {
      console.log('Carrying over');
      i--;
      isCarryingOver = true;
    } else {
      console.log('Adding');
      for (let j = i + 1; j < nextNum.length; j++) {
        nextNum[j] = nextNum[j - 1] + 1;
      }
      isCarryingOver = false;
    }
    if (!isCarryingOver) {
      return nextNum;
    }
  }
}

describe(nextNumber.name, () => {
  const testCases: TestCase<[number[], number], number[] | undefined>[] = [
    new TestCase([[1, 2, 3], 5], [1, 2, 4]),
    new TestCase([[1, 2, 4], 5], [1, 2, 5]),
    new TestCase([[1, 2, 5], 5], [1, 3, 4]),
    new TestCase([[3, 4, 5], 5], undefined, 'At max number, return undefined'),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = nextNumber(...testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
