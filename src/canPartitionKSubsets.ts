import { runTests, TestCase } from './testHelpers';

/**
 * Parition array into k buckets that have equal sums
 * @return array of same size as the input with numbers 0 to k-1 inclusive where input[i] belongs to group result[i]
 */
function partitionToBuckets(A: number[], k: number): number[] | undefined {
  const totalSum = A.reduce((acc, num) => acc + num);
  if (totalSum % k !== 0) {
    return undefined;
  }
  const sumPerBucket = totalSum / k;

  const sums: number[] = [];
  for (let i = 0; i < k; i++) {
    sums.push(0);
  }
  const path: number[] = [];
  return partitionBucketHelper(A, sumPerBucket, 0, sums, path);
}

function partitionBucketHelper(
  A: number[],
  targetSum: number,
  startIndex: number,
  sums: number[],
  path: number[]
): number[] | undefined {
  if (path.length === A.length) {
    if (sums.every((sum) => sum === targetSum)) {
      return path;
    } else {
      return undefined;
    }
  }

  const num = A[startIndex];
  for (let i = 0; i < sums.length; i++) {
    // Add num to one of the buckets
    const oldSum = sums[i];
    const newSum = sums[i] + num;
    if (newSum <= targetSum) {
      sums[i] = newSum;
      path.push(i);
      const result = partitionBucketHelper(
        A,
        targetSum,
        startIndex + 1,
        sums,
        path
      );
      if (result !== undefined) {
        return result;
      }
      sums[i] = oldSum;
      path.pop();
    }
  }
  return undefined;
}

function canPartitionKSubsets(nums: number[], k: number): boolean {
  const result = partitionToBuckets(nums, k);
  return result !== undefined;
}

describe(canPartitionKSubsets.name, () => {
  const testCases: TestCase<[number[], number], boolean>[] = [
    new TestCase([[4, 3, 2, 3, 5, 2, 1], 4], true),
    new TestCase([[1, 2, 3, 4], 3], false),
    new TestCase(
      [
        [
          3522, 181, 521, 515, 304, 123, 2512, 312, 922, 407, 146, 1932, 4037,
          2646, 3871, 269,
        ],
        5,
      ],
      true
    ),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = canPartitionKSubsets(...testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
