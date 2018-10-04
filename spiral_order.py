def spiralOrder(matrix):
    if not matrix:
        return matrix
    elif len(matrix) == 1:  # 1 row
        return matrix[0]
    elif len(matrix[0]) == 1:   # 1 column
        return [matrix[i][0] for i in range(len(matrix))]

    return spiralOrderHelper(matrix, (0, 0), (len(matrix) - 1, len(matrix[0]) - 1))


def spiralOrderHelper(matrix, top_left_corner, bottom_right_corner):
    """
    :param matrix: List[List[int]], the matrix
    :param top_left_corner: 2-tuple, the top left corner (row, column)
    :param bottom_right_corner: 2-tuple, the bottom right corner (row, column)
    :return: List[int], the elements of the matrix in "spiral" order, clockwise
    """
    top_row, left_col = top_left_corner
    bot_row, right_col = bottom_right_corner

    # base case: none
    if top_row > bot_row or left_col > right_col:
        return []
    # base case: single element
    elif top_left_corner == bottom_right_corner:
        return [matrix[top_row][left_col]]

    else:
        ret = []

        # go right, do not include last element (covered by the next loop)
        for i in range(left_col, right_col):
            ret.append(matrix[top_row][i])
        # check spiral ends
        if top_row == bot_row:
            ret.append(matrix[top_row][right_col])
            return ret

        # go down
        for i in range(top_row, bot_row):
            ret.append(matrix[i][right_col])
        # check spiral ends
        if left_col == right_col:
            ret.append(matrix[bot_row][right_col])
            return ret

        # go left
        for i in range(right_col, left_col, -1):
            ret.append(matrix[bot_row][i])

        # go up
        for i in range(bot_row, top_row, -1):
            ret.append(matrix[i][left_col])

        # recursive call
        ret.extend(spiralOrderHelper(matrix, (top_row + 1, left_col + 1), (bot_row - 1, right_col - 1)))
        return ret


# 0x0
assert(spiralOrder([]) == [])

# 1x1
assert(spiralOrder([
    [1]
]) == [1])

# 1x2
assert(spiralOrder([
    [1,2]
]) == [1,2])

# 2x1
assert(spiralOrder([
    [1],
    [2],
]) == [1,2])

# 2x2
assert(spiralOrder([
    [1,2],
    [3,4],
]) == [1,2,4,3])

# 3x3
assert(spiralOrder([
    [1,2,3],
    [4,5,6],
    [7,8,9]
]) == [1,2,3,6,9,8,7,4,5])

# 3x4
assert(spiralOrder([
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12]
]) == [1,2,3,4,8,12,11,10,9,5,6,7])

# 4x6
assert(spiralOrder([
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16],
    [17,18,19,20],
    [21,22,23,24]
]) == [1,2,3,4, 8,12,16,20,24, 23,22,21, 17,13,9,5, 6,7, 11,15,19, 18,14,10])

