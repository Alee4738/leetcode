/*
Given an array of integers and an integer k, you need to find the total number of continuous subarrays whose sum equals to k.

Example 1:

Input:nums = [1,1,1], k = 2
Output: 2

Note:

    The length of the array is in range [1, 20,000].
    The range of numbers in the array is [-1000, 1000] and the range of the integer k is [-1e7, 1e7].
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  let n = nums.length;
  let ret = 0;
  let prevSums = {0: 1}; // previous sums
  let total = 0;
  nums.map(val => {
    total += val;
    if (prevSums[total-k]) {
      ret += prevSums[total-k];
    }
    
    if (prevSums[total]) {
      prevSums[total] += 1;
    } else {
      prevSums[total] = 1;
    }
  });
  return ret;
};

/* 
if they asked us to return the subarrays
*/
var subarray = function(nums, k) {
  let n = nums.length;
  let ret = [];
  let prevSums = {0: [[0,-1]]}; // previous sums, in the form [start,end]
  let total = 0;

  nums.map((val, i) => {
    total += val;

    if (prevSums[total-k]) {
      prevSums[total-k].map(interval => {
        // console.log(interval);
        ret.push([interval[1]+1, i]);
        // console.log(ret);
      });
    }
    
    if (prevSums[total]) {
      prevSums[total].push([0, i]);
    } else {
      prevSums[total] = [[0, i]];
    }
  });
  return ret;
};

