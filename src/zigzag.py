# https://leetcode.com/problems/zigzag-conversion/description/


def zigzag(num_rows):
    """
    :param num_rows: int [1,inf), number of rows to zigzag between
    :return: int [0, num_rows), next position to zigzag , starting from 0
    """
    curr = 0
    direction = 1

    while True:
        yield curr
        if not (0 <= curr + direction < num_rows):
            # reverse direction
            direction = -1 * direction
        curr = curr + direction


def convert(s, numRows):
    buckets = []
    for i in range(numRows):
        buckets.append([])

    generator = zigzag(numRows)

    for i in range(len(s)):
        buckets[next(generator)].append(s[i])

    converted = ''
    for b in buckets:
        converted = converted + ''.join(b)

    return converted


s = 'PAYPALISHIRING'

print(convert(s, 3))

