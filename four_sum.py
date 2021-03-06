"""
Given an array nums of n integers and an integer target, are there elements a, b, c, and d in nums
such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.

Note: The solution set must not contain duplicate quadruplets.
"""


def fourSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[List[int]]
    """
    # three pointer solution, just like two pointer solution of 3sum
    if len(nums) < 4:
        return []

    nums.sort()

    # get rid of targets out of bounds
    if nums[0] + nums[1] + nums[2] + nums[3] > target \
            or nums[-1] + nums[-2] + nums[-3] + nums[-4] < target:
        return []

    ret = []
    for i in range(len(nums)):
        # don't run a duplicate
        if i != 0 and nums[i] == nums[i - 1]:
            continue

        for j in range(i + 1, len(nums)):
            # don't run a duplicate
            if j != i + 1 and nums[j] == nums[j - 1]:
                continue

            beg, end = j + 1, len(nums) - 1
            while end - beg > 0:
                # don't run a duplicate
                if beg != j + 1 and nums[beg] == nums[beg - 1]:
                    beg = beg + 1
                    continue
                if end != len(nums) - 1 and nums[end] == nums[end + 1]:
                    end = end - 1
                    continue


                test_sum = nums[i] + nums[j] + nums[beg] + nums[end]

                if test_sum < target:
                    beg = beg + 1
                elif test_sum > target:
                    end = end - 1
                else:
                    ret.append([nums[i], nums[j], nums[beg], nums[end]])
                    # go to next possible quadruple
                    beg = beg + 1

    return ret


lc_1 = [-1, 0, 1, 2, -1, -4]    # -1, expect [[-4,0,1,2],[-1, 1,0,1]]
lc_2 = [-482, -468, -465, -460, -451, -428, -426, -415, -411, -405, -396, -394, -372, -370,
        -368, -361, -358, -353, -352, -334, -318, -300, -287, -273, -251, -241, -239, -218,
        -215, -212, -187, -185, -170, -145, -123, -112, -73, -63, -58, -36, -19, 34, 42, 47,
        85, 113, 126, 128, 134, 180, 181, 199, 206, 221, 229, 242, 243, 255, 262, 270, 305,
        372, 393, 405, 420, 427, 428, 433, 446, 458, 469, 471, 486]    # -3524, expect ...

print(fourSum(lc_1, -1))
print()
