"""
Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

Example 1:

Input: [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Example 2:

Input: [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum
             jump length is 0, which makes it impossible to reach the last index.

"""

def canJump(nums):
    """
    :type nums: List[int]
    :rtype: bool
    """
    if nums == []:
        return False
    elif len(nums) == 1:
        return True

    # depth first search, adding all possible next destinations
    goal_idx = len(nums) - 1

    def can_jump(curr_idx):
        if curr_idx + nums[curr_idx] >= goal_idx:
            return True

        # try to jump the farthest, then jump 1 less and 1 less
        # edge case: ignore when array tells us we can jump 0
        for i in range(nums[curr_idx], 0, -1):
            if can_jump(curr_idx + i):
                return True
        return False

    return can_jump(0)


assert(canJump([2,3,1,1,4]))
assert(not canJump([3,2,1,0,4]))
assert(canJump([3,1]))