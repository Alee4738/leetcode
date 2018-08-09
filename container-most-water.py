height = [1,8,6,2,5,4,8,3,7]

# create points independent of position in list
sorted_points = []
for i in range(len(height)):
    sorted_points.append((i, height[i]))
sorted_points.sort(key=lambda x: x[1])

# maintain array of valid points left
valid_points = [True for i in range(len(height))]
leftmost_valid, rightmost_valid = 0, len(height) - 1

# greedy part, starting from lowest point
max_area = 0
for p in sorted_points:
    # match with farthest point
    max_width = max(p[0] - leftmost_valid, rightmost_valid - p[0])

    # height is guaranteed to be the lowest point's height
    area = max_width * p[1]

    max_area = max(max_area, area)

    # invalidate lowest point
    valid_points[p[0]] = False
    # fix valid ends
    while leftmost_valid < len(valid_points) and not valid_points[leftmost_valid]:
        leftmost_valid = leftmost_valid + 1
    while rightmost_valid > 0 and not valid_points[rightmost_valid]:
        rightmost_valid = rightmost_valid - 1

print(max_area)
