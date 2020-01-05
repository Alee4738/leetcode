"""
Given two non-negative integers num1 and num2 represented as strings,
return the product of num1 and num2, also represented as a string.

Example 1:

Input: num1 = "2", num2 = "3"
Output: "6"

Example 2:

Input: num1 = "123", num2 = "456"
Output: "56088"

Note:

    The length of both num1 and num2 is < 110.
    Both num1 and num2 contain only digits 0-9.
    Both num1 and num2 do not contain any leading zero, except the number 0 itself.
    You must not use any built-in BigInteger library or convert the inputs to integer directly.
"""
import unittest

# Idea: implement standard multiplication
# Idea for later: implement karatsuba multiplication


# standard multiplication
def multiply(num1, num2):
    # easy case: 0
    if num1 == '0' or num2 == '0' or num1 == '' or num2 == '':
        return '0'

    product = 0
    # convert strings to ints one number at a time
    # multiply single digit ints, adding to product (running total)
    for num2_i in range(len(num2) - 1, -1, -1):
        num2_place = len(num2) - num2_i - 1
        for num1_i in range(len(num1) - 1, -1, -1):
            num1_place = len(num1) - num1_i - 1
            product = product + (int(num1[num1_i]) * int(num2[num2_i]) *
                                 (10 ** (num1_place + num2_place)))

    return str(product)


class TestMultiply(unittest.TestCase):
    def test_zero(self):
        self.assertEqual(multiply('123', '0'), '0')
        self.assertEqual(multiply('0', '123'), '0')
        self.assertEqual(multiply('0', '0'), '0')

    def test_single_digit(self):
        self.assertEqual(multiply('3', '4'), '12')
        self.assertEqual(multiply('7', '7'), '49')
        self.assertEqual(multiply('9', '9'), '81')

    def test_double_digit(self):
        self.assertEqual(multiply('12', '34'), '408')
        self.assertEqual(multiply('56', '78'), '4368')
        self.assertEqual(multiply('33', '99'), '3267')

    def test_mixed_digit(self):
        self.assertEqual(multiply('5932', '23'), '136436')
        self.assertEqual(multiply('14', '233'), '3262')
