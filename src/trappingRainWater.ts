import { TestCase, runTests } from './testHelpers';

function trap(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let result = 0;
  while (left < right) {
    if (height[left] <= height[right]) {
      const lowerPeakHeight = height[left];
      left++;
      while (left < right && lowerPeakHeight > height[left]) {
        result += lowerPeakHeight - height[left];
        left++;
      }
    } else {
      const lowerPeakHeight = height[right];
      right--;
      while (left < right && lowerPeakHeight > height[right]) {
        result += lowerPeakHeight - height[right];
        right--;
      }
    }
  }
  return result;
}

describe(trap.name, () => {
  const testCases: TestCase<number[], number>[] = [
    new TestCase([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], 6),
    new TestCase([4, 2, 0, 3, 2, 5], 9),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = trap(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
