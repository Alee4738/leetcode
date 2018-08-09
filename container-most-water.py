# based on leetcode solution: https://leetcode.com/problems/container-with-most-water/solution/#
"""
If we try to move the pointer at the longer line inwards, we won't gain any increase in area,
since it is limited by the shorter line. But moving the shorter line's pointer could turn out
to be beneficial, as per the same argument, despite the reduction in the width. This is done
since a relatively longer line obtained by moving the shorter line's pointer might overcome
the reduction in area caused by the width reduction.
"""

height = [1,8,6,2,5,4,8,3,7]

# start at the ends (largest width)
left, right = 0, len(height) - 1

max_area = 0
while right - left > 0:
    area = (right - left) * min(height[left], height[right])
    max_area = max(max_area, area)

    # update based on possibly increasing area
    if height[left] < height[right]:
        left = left + 1
    else:
        right = right - 1

print(max_area)
