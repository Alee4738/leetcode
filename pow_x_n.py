"""
Implement pow(x, n), which calculates x raised to the power n (xn).

Example 1:

Input: 2.00000, 10
Output: 1024.00000

Example 2:

Input: 2.10000, 3
Output: 9.26100

Example 3:

Input: 2.00000, -2
Output: 0.25000
Explanation: 2-2 = 1/22 = 1/4 = 0.25

Note:

    -100.0 < x < 100.0
    n is a 32-bit signed integer, within the range [−231, 231 − 1]

"""

def myPow(self, x, n):
    """
    :type x: float
    :type n: int
    :rtype: float
    """
    # Base cases
    threshold = 1e-6
    # convention: pow(0, 0) is 1
    if abs(x-1) < threshold or n == 0:
        return 1
    elif abs(x) < threshold:
        return 0
    elif n == 1:
        return x
    elif n == -1:
        return 1/x
    else:
        # Recursive case
        square_root = myPow(x, n // 2)
        return square_root * square_root * (x if n % 2 == 1 else 1)