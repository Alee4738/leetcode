import { TestCase } from './testCase';

function firstMissingPositive(nums: number[]): number {
  // Hash table to the rescue
  // O(n) time, O(n) space
  const numsSet = new Set<number>(nums);
  let result = 1;
  while (numsSet.has(result)) {
    result++;
  }
  return result;
}

// function firstMissingPositive(nums: number[]): number {
//   // Attempt: O(n) time, O(1) space
//   // Take advantage of the length. We know the answer is between 1 and nums.length + 1 inclusive
//   // If I can modify nums, then delete the 0s, negatives, anything above nums.length - O(n)
//   // Now we're left with an array like [3, 1, 1, 5, 10, 7, 10]
//   // Something about math - XOR, fast/slow pointer, values become indices
//   // Choice: values become indices
//   // subtract 1 from each [2, 0, 0, 5, 9, 6, 9]. Do the jumping

//   return 0;
// }

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
