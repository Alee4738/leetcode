import { runTests, TestCase, XTestCase } from './testHelpers';

// Given an integer array nums and an integer k, return true if it is possible to divide this array into k non-empty subsets whose sums are all equal.
// Assumptions
// 1 <= k <= nums.length <= 16
// 1 <= nums[i] <= 104
// The frequency of each element is in the range [1, 4].
// let timesCalled = 0;

function canPartitionKSubsetsFast(nums: number[], k: number): boolean {
  // timesCalled = 0;
  let maxNum = 0;
  let totalSum = 0;
  for (const num of nums) {
    maxNum = Math.max(maxNum, num);
    totalSum += num;
  }
  const targetSumPerSubset = totalSum / k;

  if (totalSum % k !== 0 || maxNum > targetSumPerSubset) {
    return false;
  }

  const result = helper(nums, targetSumPerSubset, 0, 0, k, []);
  // console.log('timesCalled', timesCalled);
  return result;
}

function helper(
  A: number[],
  targetSum: number,
  currSum: number,
  startIndex: number,
  subsetsLeft: number,
  used: boolean[]
): boolean {
  // timesCalled++;
  // console.log(
  //   'helper',
  //   'targetSum',
  //   targetSum,
  //   'currSum',
  //   currSum,
  //   'startIndex',
  //   startIndex,
  //   'subsetsLeft',
  //   subsetsLeft
  // );
  if (subsetsLeft === 0) {
    return true;
  }

  if (startIndex > A.length) {
    return false;
  }

  if (currSum === targetSum) {
    return helper(A, targetSum, 0, 0, subsetsLeft - 1, used);
  }

  const newSum = currSum + A[startIndex];
  if (!used[startIndex] && newSum <= targetSum) {
    used[startIndex] = true;
    if (helper(A, targetSum, newSum, startIndex + 1, subsetsLeft, used)) {
      return true;
    }
    used[startIndex] = false;
  }
  if (helper(A, targetSum, currSum, startIndex + 1, subsetsLeft, used)) {
    return true;
  }

  return false;
}

// Slower solution
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
  // timesCalled++;
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

function canPartitionKSubsetsSlow(nums: number[], k: number): boolean {
  // timesCalled = 0;
  const result = partitionToBuckets(nums, k);
  // console.log('timesCalled', timesCalled);
  return result !== undefined;
}

const canPartitionKSubsets = canPartitionKSubsetsFast;
// const canPartitionKSubsets = canPartitionKSubsetsSlow;

describe(canPartitionKSubsets.name, () => {
  const testCases: TestCase<[number[], number], boolean>[] = [
    new XTestCase([[4, 3, 2, 3, 5, 2, 1], 4], true),
    new XTestCase([[1, 2, 3, 4], 3], false),
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
    new TestCase(
      [
        [
          3522, 181, 521, 515, 304, 123, 2512, 312, 922, 407, 146, 1932, 4037,
          2646, 3871, 269,
          // Add 3 to every bucket
          3, 1, 2, 1, 1, 1, 2, 1, 3,
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
