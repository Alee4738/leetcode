import { TestCase } from './testHelpers';

// function firstMissingPositive(nums: number[]): number {
//   // Hash table to the rescue
//   // O(n) time, O(n) space
//   const numsSet = new Set<number>(nums);
//   let result = 1;
//   while (numsSet.has(result)) {
//     result++;
//   }
//   return result;
// }

function firstMissingPositive(nums: number[]): number {
  // O(n) time, O(1) space
  // 1. Take advantage of the length. We know the answer is between 1 and nums.length + 1 inclusive
  // Because in the worst case, all numbers 1, 2, ... nums.length exist, so the maxmimum answer is nums.length + 1
  // If I can modify nums, then delete the negatives and anything above nums.length, which is a O(n) operation

  // 2. Math trick - values somehow become indices
  // Ex. if we have [3, 1, 1, 4]. Look at the nums[0] = 3
  // Set nums[3] = nums[3] + nums.length. It may seem like you clobbered the value 4, but we can retrieve it with
  // nums[3] === nums[3] % n
  // This allows you to store a digit (4) and the frequency of another digit (3) in the same value

  // corrects for indices
  nums.unshift(0);

  const len = nums.length;

  for (let i = 0; i < len; i++) {
    if (nums[i] < 0 || nums[i] >= len) {
      // Discard the digit, we only care about the frequency in this value
      nums[i] = 0;
    }
  }

  // Store frequencies without clobbering existing numbers
  for (let index = 0; index < len; index++) {
    const digitForWhichToStoreFrequency = nums[index] % len;
    nums[digitForWhichToStoreFrequency] += len;
  }

  for (let i = 1; i < len; i++) {
    const freqOfI = Math.floor(nums[i] / len);
    if (freqOfI === 0) {
      return i;
    }
  }

  return len;
}

describe(firstMissingPositive.name, () => {
  const testCases: TestCase<number[], number>[] = [
    new TestCase([1], 2),
    new TestCase([1, 2, 3, 4, 5], 6, 'sorted 1-5'),
    new TestCase([4, 1, 2, 5, 3], 6, 'unsorted 1-5'),
    new TestCase(
      [0, 4, 1, -1, 2, 5, 3],
      6,
      '0 and negative numbers are not counted'
    ),
    new TestCase([0, 2, 5], 1, 'does not have 1'),
    new TestCase([1, 5, 2], 3, 'has gaps'),
    new TestCase([1, 1, -1, 2, 5, 10, 3, 4, 10], 6, 'has repeats and gaps'),
  ];

  testCases.forEach((testCase) => {
    it(testCase.desc ?? 'None', () => {
      const actualResult = firstMissingPositive(testCase.input);
      expect(actualResult).toEqual(testCase.expectedOutput);
    });
  });
});
