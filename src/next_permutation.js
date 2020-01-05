/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
let nextPermutation = function(nums) {
  if (nums.length <= 1) {
    return nums;
  }
  
  // Note: A is the array, n is the length
  let n = nums.length;
  let permuted = false;
  
  for (let i = n-2; i >= 0; i--) {
    if (nums[i] < nums[i+1]) {
      // Find the first number > A[i], then swap
      for (let j = n-1; j >= i+1; j--) {
        if (nums[j] > nums[i]) {
          let swap_tmp = nums[i];
          nums[i] = nums[j];
          nums[j] = swap_tmp;
          break;
        }
      }

      // reverse A[i+1:]
      for (let j = i+1; j < Math.floor((n+i+1)/2); j++) {
        let rev_tmp = nums[j];
        nums[j] = nums[n+i-j];
        nums[n+i-j] = rev_tmp;
      }
      
      permuted = true;
      break;
    }
  }

  if (!permuted) {
    // reverse A
    for (let j = 0; j < Math.floor((n+1)/2); j++) {
      let rev_tmp = nums[j];
      nums[j] = nums[n-j-1];
      nums[n-j-1] = rev_tmp;
    }
  }
};



describe('next permutation function', () => {
  let dups1;
  let dups2;

  beforeEach(() => {
    dups1 = [1,2,2,3];
    dups2 = [3,1,2,4,2];
  });

  it('deals with size 1 arrays', () => {
    expect((() => { let a = [1]; nextPermutation(a); return a; })()).toEqual([1]);
    expect((() => { let a = [10]; nextPermutation(a); return a; })()).toEqual([10]);
  });

  it('permutes at end of array', () => {
    expect((() => { nextPermutation(dups1); return dups1; })()).toEqual([1,2,3,2]);
  });

  it('rotates entire array correctly', () => {
    expect((() => { nextPermutation(dups1); return dups1; })()).toEqual([1,2,3,2]);
    expect((() => { nextPermutation(dups1); return dups1; })()).toEqual([1,3,2,2]);
    expect((() => { nextPermutation(dups1); return dups1; })()).toEqual([2,1,2,3]);
    expect((() => { nextPermutation(dups1); return dups1; })()).toEqual([2,1,3,2]);
    expect((() => { nextPermutation(dups1); return dups1; })()).toEqual([2,2,1,3]);
    expect((() => { nextPermutation(dups1); return dups1; })()).toEqual([2,2,3,1]);
    expect((() => { nextPermutation(dups1); return dups1; })()).toEqual([2,3,1,2]);
    expect((() => { nextPermutation(dups1); return dups1; })()).toEqual([2,3,2,1]);
    expect((() => { nextPermutation(dups1); return dups1; })()).toEqual([3,1,2,2]);
    expect((() => { nextPermutation(dups1); return dups1; })()).toEqual([3,2,1,2]);
    expect((() => { nextPermutation(dups1); return dups1; })()).toEqual([3,2,2,1]);
    expect((() => { nextPermutation(dups1); return dups1; })()).toEqual([1,2,2,3]);
  });
});