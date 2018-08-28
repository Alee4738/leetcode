"""
Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).

The replacement must be in-place and use only constant extra memory.

Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.

1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1
"""

def nextPermutation(self, nums):
    """
    :type nums: List[int]
    :rtype: void Do not return anything, modify nums in-place instead.
    """
    i = len(nums) - 2
    while i >= 0:
        for j in range(len(nums) - 1, i, -1):
            if nums[i] < nums[j]:
                # swap i and j
                nums[i], nums[j] = nums[j], nums[i]
                
                # sort nums[i+1:] by reversing it (no extra space needed)
                beg, end = i + 1, len(nums) - 1
                while beg < end:
                    # swap beg and end
                    nums[beg], nums[end] = nums[end], nums[beg]
                    # walk towards each other
                    beg, end = beg + 1, end - 1
                return
        i = i - 1
    # cannot return next permutation, loop back
    nums.reverse();
    return