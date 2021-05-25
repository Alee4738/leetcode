import { TestCase, runTests } from './testHelpers';

function isIdealPermutation(nums: number[]): boolean {
  // let globalInversions = 0;
  // let localInversions = 0;
  // for (let i = 0; i < nums.length - 1; i++) {
  //     for (let j = i + 1; j < nums.length; j++) {
  //         if (nums[i] > nums[j]) {
  //             globalInversions++;
  //             if (i === j - 1) {
  //                 localInversions++;
  //             }
  //         }
  //     }
  // }
  // return globalInversions === localInversions
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (Math.abs(num - i) > 1) {
      return false;
    }
  }
  return true;
}

// Naive: n^2 . Check every pair (i,j) where i < j, then if nums[i] > nums[j], globalInversions++. If also i === j - 1, then localInversions++
// Is it possible to do a O(n)?
// Local inversions can be done separately (but dont have to be), and they can be done in O(n)

// from 0 to 9 (10 elements)
// [4  ] -> 0 to 3 must be ahead of me, so globalInversions += 3
// [4 6 ] -> 0 to 5 (expect 4) must be ahead, gI += (5 - 1)
// maintain a seen { 4 }
// "How many less than me have I already seen?" (binary tree?)
// seen { 4, 6 }
// [4 6 0] -> nothing
// [4 6 0 2] -> gI += 2 - 0
// seems like it's still n^2

// wishful thinking
// [4] -> i 0, A[i] 4, so this is +4 spots away from where it should be (A[4]), so gi += 4
// [4 6] -> i 1 A[i] 6. This is (6-1) = +5 spots away from where it should be, so gi += 5
// [4 6 0] -> (0-2) = -2 spots away, but that was already accounted for....do nothing
// ...and I do it for the rest of the array
// This means I have overcounted the number of global inversions.

// I need to know how many guys I've seen that are greater than X. FAST
// I need to insert this into a balanced BST

// If GI = 0, then it's sorted ascending
// If GI = 1
//   0 can only be at positions 0 or 1
//   1 can be at 0 (switched with 0), 1 (unchanged), 2 (switched with 2)
//   2 at 1,2,3
//   3 at 2,3,4
// Pattern?: GI the max distance this number can be from its unchanged position
// If GI = 2
//   0 at 0,1
// New Pattern?: for all i, if |A[i] - i| > 1, then we have a global inversion that is not counted as a local inversion
// if A[i] < i and |A[i] - i| > 1 less, then there's a global inversion where?

// Prove that this only catches global invs that are not local inversions
// num i, |num - i| > 1

describe(isIdealPermutation.name, () => {
  const testCases: TestCase<number[], boolean>[] = [
    new TestCase([1, 0, 2], true),
    new TestCase([1, 2, 0], false),
    new TestCase([0], true),
    new TestCase([0, 1, 2, 3], true),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = isIdealPermutation(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
