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
    if not nums:
        return False
    elif len(nums) == 1:
        return True

    # work backwards, constantly changing the goal to lower indices
    goal_idx = len(nums) - 1
    curr_idx = len(nums) - 2
    while curr_idx >= 0:
        if curr_idx + nums[curr_idx] >= goal_idx:   # we can reach the goal from current index
            goal_idx = curr_idx # make current index the new goal
        curr_idx = curr_idx - 1

    return goal_idx == 0


assert(canJump([2,3,1,1,4]))
assert(not canJump([3,2,1,0,4]))
assert(canJump([3,1]))