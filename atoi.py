import re


def myAtoi(str):
    """
    :type str: str
    :rtype: int
    """
    pattern = re.compile(r'^ *([+-]?[0-9]+)')
    match = pattern.match(str)
    if match:
        ret = int(match.expand(r'\1'))
        maxint32 = pow(2, 31) - 1
        minint32 = -1 * pow(2, 31)

        if ret > maxint32:
            return maxint32
        elif ret < minint32:
            return minint32
        else:
            return ret
    else:
        return 0


# return the right number
right_number = ['-123', '   -123', '+123', '   +123', '-123  c -123', '-123c']
for n in right_number:
    print(myAtoi(n))

# return 0
zero = ['c-123', '-c123', '-+123', '++123']
for n in zero:
    print(myAtoi(n))

# return max int
print(myAtoi('123456789123456'))
# return min int
print(myAtoi('-123456789123456'))
