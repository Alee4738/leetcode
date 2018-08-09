def area(point_1, point_2):
    return abs(point_1[0] - point_2[0]) * min(point_1[1], point_2[1])


points = [1,8,6,2,5,4,8,3,7]

# Naive solution: for each pair, keep running max
max_area = 0
max_p1, max_p2 = (1, 0), (2, 0)
for i, a_i in zip(range(1, len(points) + 1), points):
    for j, a_j in zip(range(1, len(points) + 1), points):
        a = area((i, a_i), (j, a_j))
        if a > max_area:
            max_area = a
            max_p1 = (i, a_i)
            max_p2 = (j, a_j)

print(max_area)