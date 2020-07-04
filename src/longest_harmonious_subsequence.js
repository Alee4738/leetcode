/*
We define a harmonious array is an array where the difference between its maximum value and its minimum value is exactly 1.

Now, given an integer array, you need to find the length of its longest harmonious subsequence among all its possible subsequences.

Example 1:

Input: [1,3,2,2,5,2,3,7]
Output: 5
Explanation: The longest harmonious subsequence is [3,2,2,2,3].

Note: The length of the input array will not exceed 20,000.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function (nums) {
  let freq = {};
  let ret = 0;

  nums.map((val) => {
    if (!freq[val]) {
      freq[val] = 1;
    } else {
      freq[val]++;
    }

    // find subsequences for {val, val-1}
    if (freq[val - 1]) {
      ret = Math.max(ret, freq[val] + freq[val - 1]);
    }

    // find subsequences for {val, val+1}
    if (freq[val + 1]) {
      ret = Math.max(ret, freq[val] + freq[val + 1]);
    }
  });

  return ret;
};

// jasmine test cases
describe("longest harmonious subsequence", () => {
  it("handles leetcode example", () => {
    expect(findLHS([1, 3, 2, 2, 5, 2, 3, 7])).toEqual(5); // [3,2,2,2,3]
  });

  it("handles empty array", () => {
    expect(findLHS([])).toEqual(0);
  });

  it("handles single element array", () => {
    expect(findLHS([3])).toEqual(0);
  });

  it("handles simple array", () => {
    expect(findLHS([1, 2, 3, 4, 5])).toEqual(2);
  });

  it("handles random array", () => {
    expect(findLHS([1, -4, 5, 5, 5, -2, -3, 5, 4, 5, 4])).toEqual(7); // [5,5,5,5,4,5,4]
  });
});
